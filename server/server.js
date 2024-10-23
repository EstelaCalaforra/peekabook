import express from 'express'
import cors from 'cors'
import pg from 'pg'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { getBestsellers, getBooksDB, getQuote, getBooksGoogleAPI } from './functions.js'

// Important consts
const app = express()
const port = 5000

const saltRounds = 10

dotenv.config()

// Database
const db = new pg.Client({
  user: process.env.DB_USER,
  host: 'localhost',
  database: 'pickabook',
  password: 'estelacodes',
  // password: 'administrador',
  port: 5432
})
db.connect()

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Signup
app.post('/signup', async (req, res) => {
  const { email, password } = req.body

  try {
    // check if user exists
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email])

    if (userExists.rows.length > 0) {
      return res.json({ success: false, message: 'User already exists' })
    }

    // insert new user with hashed password
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      const response = await db.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id', [email, hash])
      res.json({ success: true, message: err, userId: response.rows[0].id })
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    // consult to the database
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    if (result.rows.length > 0) {
      // user found, check if hashed password matches form password
      const hashedPassword = result.rows[0].password
      bcrypt.compare(password, hashedPassword, async (_err, same) => {
        if (same) {
          res.json({ success: true, message: 'Login successful!', userId: result.rows[0].id })
        } else {
          res.json({ success: false, message: 'Wrong password. Please try again.' })
        }
      })
    } else {
      // user not found
      res.json({ success: false, message: 'Invalid email. Please try again.' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Add book to user (database)
app.post('/api/add-books/user/:id', async (req, res) => {
  const { userId, book } = req.body

  try {
    // insert book into books table
    const response = await db.query('INSERT INTO books (title, cover) VALUES ($1, $2) RETURNING id', [book.title, book.cover])
    const bookId = response.rows[0].id
    // insert user and book into user_books table
    try {
      const response = await db.query('INSERT INTO user_books (user_id, book_id, read_date) VALUES ($1, $2, $3)', [userId, bookId, book.readDate])
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Server error' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Add book search results to database if not already on it (database)
app.post('/api/add-results-to-db', async (req, res) => {
  const { bookData } = req.body

  try {
    // Insert book into books table
    const bResponse = await db.query(
      'INSERT INTO books (title, cover, id_api) VALUES ($1, $2, $3) RETURNING id',
      [bookData.title, bookData.cover, bookData.id]
    )
    const bookId = bResponse.rows[0].id

    // Insert or retrieve author id
    for (const authorName of bookData.authors) {
      try {
        // Verify if author already exists in authors table
        let aResponse = await db.query(
          'SELECT id FROM authors WHERE fullname = $1',
          [authorName]
        )
        let authorId
        if (aResponse.rows.length > 0) {
          // If author exists use their id
          authorId = aResponse.rows[0].id
        } else {
          // If author doesn't exists insert name and retrieve their id
          aResponse = await db.query(
            'INSERT INTO authors (fullname) VALUES ($1) RETURNING id',
            [authorName]
          )
          authorId = aResponse.rows[0].id
        }

        // Insertar relación en la tabla book_authors
        await db.query(
          'INSERT INTO book_authors (book_id, author_id) VALUES ($1, $2)',
          [bookId, authorId]
        )
      } catch (error) {
        console.log('Error al manejar el autor:', error)
        return res.status(500).json({ success: false, message: 'Server error al manejar autor' })
      }
    }

    // Si todo sale bien
    res.status(200).json({ success: true, message: 'Libro y autores insertados correctamente' })
  } catch (error) {
    console.log('Error al insertar en books:', error)
    res.status(500).json({ success: false, message: 'Server error al insertar libro' })
  }
})

// Recite API (external api)
app.get('/get-random-quote', async (req, res) => {
  const quoteData = await getQuote()
  res.json(quoteData)
})

// Google Books API (external api)
app.get('/get-books-google-api', async (req, res) => {
  const { bookQuery } = req.query
  const books = await getBooksGoogleAPI({ bookQuery })
  res.json(books)
})

app.get('/get-bestsellers', async (req, res) => {
  const bestSellers = await getBestsellers()
  res.json(bestSellers)
})

app.get('/get-bookshelf', async (req, res) => {
  const bookshelf = await getBooksDB({ db })
  res.json(bookshelf)
})

app.get('/api', async (req, res) => {
  const bookData = await getBooksDB()
  res.json(bookData)
})

app.listen(port, function (err) {
  if (err) console.log(err)
  console.log('Server listening on PORT', port)
})
