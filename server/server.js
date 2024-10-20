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
  database: 'pickabook',
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
      const response = await db.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id', [email, hash])
      res.json({ success: true, message: err, userId: response.rows[0].id })
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

// post book to database from user
app.post('/api/add-books/user/:id', async (req, res) => {
  const postFormInfo = req.body
  const { userId, book } = req.body
  // console.log({ postFormInfo })
  // console.log({ userId })
  // console.log({ book })

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

// post book to database from search query if not already on it
app.post('/api/add-books/', async (req, res) => {
  const { bookData } = req.body
  console.log({ bookData })

  try {
    // insert book into books table
    const response = await db.query('INSERT INTO books (title, cover, id_api) VALUES ($1, $2) RETURNING id', [bookData.title, bookData.cover, bookData.id])
    console.log(response.data)
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// get books from database
async function getBooks () {
  try {
    const selectQuery = 'SELECT b.title, a.fullname AS author, c.name AS category, b.cover, b.id_api FROM books b JOIN book_authors ba ON b.id = ba.book_id JOIN authors a ON ba.author_id = a.id JOIN book_categories bc ON b.id = bc.book_id JOIN categories c ON bc.category_id = c.id'
    const result = await db.query(selectQuery)
    const books = result.rows
    console.log({ books })
    return books
  } catch (error) {
    console.log(error)
  }
}

// get random quote from OnRender API
async function getQuote () {
  try {
    const response = await axios.get('https://recite.onrender.com/api/v1/random')
    const quote = response.data
    return quote
  } catch (error) {
    console.log(error)
  }
}

// get bestseller books from NYTimes API
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

// get book covers from Google API
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
        imgPath = response.data.items[0].volumeInfo.imageLinks.smallThumbnail
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

app.get('/get-random-quote', async (req, res) => {
  const quoteData = await getQuote()
  res.json(quoteData)
})

app.get('/get-books-google-api', async (req, res) => {
  const books = await getBooksFromGoogleAPI()
  res.json(books)
})

app.get('/get-bestsellers', async (req, res) => {
  const bestSellers = await getBestsellers()
  res.json(bestSellers)
})

app.get('/get-bookshelf', async (req, res) => {
  const bookshelf = await getBooks()
  await getBookCover(bookshelf)
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
