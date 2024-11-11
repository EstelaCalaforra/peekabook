import pg from 'pg'
import * as dotenv from 'dotenv'
import { Router } from 'express'
import jwt from 'jsonwebtoken'

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
  console.log({ userId })
  console.log({ book })

  // const authorization = req.get('authorization')
  // let token = null
  // if (authorization && authorization.toLowerCase().startsWith('bearer')) {
  //   token = authorization.substring(7)
  // }
  // const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  // if (!token || !decodedToken.id) {
  //   return res.status(401).json({ error: 'token missing or invalid' })
  // }
  // try {
  //   // insert book into books table
  //   const response = await db.query('INSERT INTO books (title, cover) VALUES ($1, $2) RETURNING id', [book.title, book.cover])
  //   const bookId = response.rows[0].id
  //   // insert user and book into user_books table
  //   try {
  //     const response = await db.query('INSERT INTO user_books (user_id, book_id, read_date) VALUES ($1, $2, $3)', [userId, bookId, book.readDate])
  //     // insert book and categories into book_categories table
  //     // try {
  //     //   const response = await db.query('INSERT INTO book_categories (book_id, category_id) VALUES ($1, $2)', [bookId, book.categories])
  //     // } catch (error) {
  //     //   console.log(error)
  //     //   res.status(500).json({ success: false, message: 'Server error' })
  //     // }
  //   } catch (error) {
  //     console.log(error)
  //     res.status(500).json({ success: false, message: 'Server error' })
  //   }
  // } catch (error) {
  //   console.log(error)
  //   res.status(500).json({ success: false, message: 'Server error' })
  // }
})
