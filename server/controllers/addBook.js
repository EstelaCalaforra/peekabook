import pg from 'pg'
import * as dotenv from 'dotenv'
import { Router } from 'express'

dotenv.config()

// Database
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})
db.connect()

export const addBookRouter = Router()

addBookRouter.post('/', async (req, res) => {
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
