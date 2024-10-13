import express from 'express'
import cors from 'cors'
import pg from 'pg'
import bodyParser from 'body-parser'
import axios from 'axios'
import * as dotenv from 'dotenv'
import bcrypt from 'bcrypt'

// import { getBooks, getBookCover } from "./functions.js";

// important consts
const app = express()
const port = 5000

const saltRounds = 10

dotenv.config()

// database
const db = new pg.Client({
  user: process.env.DB_USER,
  host: 'localhost',
  database: 'booklist',
  password: 'estelacodes',
  // password: 'administrador',
  port: 5432
})
db.connect()

// middleware
app.use(cors())
app.use(bodyParser.json())

// signup
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
      await db.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hash])
      res.json({ success: true, message: err })
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// login
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
          res.json({ success: true, message: 'Login successful!' })
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

// get books
async function getBooks () {
  try {
    const selectQuery = 'SELECT book.id, title, name, tags, rating, review, img_path FROM book INNER JOIN author ON book.id = author.id INNER JOIN review ON book.id = review.id'
    // en realidad se puede mejorar metiendolo directamente en la linea de arriba
    // const selectQuery = 'SELECT id, title, author, rating, review, img_path, tags FROM book'
    const result = await db.query(selectQuery)
    const books = result.rows
    return books
  } catch (err) {
    console.log(err)
  }
}

// get quote
async function getQuote () {
  try {
    const response = await axios.get('https://recite.onrender.com/api/v1/random')
    const quote = response.data
    return quote
  } catch (error) {
    console.log(error)
  }
}

// get bestseller books
async function getBestsellers () {
  try {
    const params = {
      'api-key': 'WdGDKFTLRAMvyfPT3LVHZAAUiEaImG0W'
    }
    const response = await axios.get('https://api.nytimes.com/svc/books/v3/lists/overview.json', { params })
    const bestSellers = response.data
    return bestSellers
  } catch (error) {
    console.log(error)
  }
}

// get covers
async function getBookCover (books) {
  const API_URL = 'https://www.googleapis.com'
  let imgPath = ''

  books.forEach(async book => {
    if (book.img_path === null) {
      try {
        const response = await axios.get(API_URL + '/books/v1/volumes', {
          params: {
            q: book.title + '+inauthor:' + book.author // book.name at homeDB
          }
        })
        // console.log(response);
        // console.log(response.data.items[0].volumeInfo)
        imgPath = response.data.items[0].volumeInfo.imageLinks.smallThumbnail
        // console.log(imgPath)
        try {
          await db.query('UPDATE book SET img_path=$1 WHERE id=$2', [imgPath, book.id])
        } catch (err) {
          console.log(err)
        }
      } catch (error) {
        console.error(error)
      }
    }
  })
}
// get book from google API
async function getBooksFromGoogleAPI () {
  try {
    const params = {
      q: 'count'
    }
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', { params })
    const bookInfo = response.data
    return bookInfo
  } catch (error) {
    console.log(error)
  }
}

app.get('/get-random-quote', async (req, res) => {
  const quoteData = await getQuote()
  res.json(quoteData)
})

app.get('/get-books-google-api', async (req, res) => {
  const books = await getBooksFromGoogleAPI()
  // console.log(books);
  res.json(books)
})

app.get('/get-bestsellers', async (req, res) => {
  const bestSellers = await getBestsellers()
  // console.log(bestSellers);
  res.json(bestSellers)
})

app.get('/get-bookshelf', async (req, res) => {
  const bookshelf = await getBooks()
  await getBookCover(bookshelf)
  console.log(bookshelf)
  res.json(bookshelf)
})

app.get('/api', async (req, res) => {
  const bookData = await getBooks()
  res.json(bookData) // our backend API that will
  // be fetched from the frontend
})

app.listen(port, function (err) {
  if (err) console.log(err)
  console.log('Server listening on PORT', port)
})
