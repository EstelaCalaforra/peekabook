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
  try {
    // insert book into books table
    const bookResult = await db.query(`
      INSERT INTO books (title, cover, id_api)
      VALUES ($1, $2, $3)
      RETURNING id
    `, [book.title, book.cover, book.id])

    const bookId = bookResult.rows[0]?.id || (await db.query('SELECT id FROM books WHERE title = $1', [book.title])).rows[0].id

    // insert author into authors table
    const authorResult = await db.query(`
    INSERT INTO authors (fullname)
    VALUES ($1)
    RETURNING id
  `, [book.author])

    const authorId = authorResult.rows[0]?.id || (await db.query('SELECT id FROM authors WHERE fullname = $1', [book.author])).rows[0].id

    // insert relation into book_authors table
    await db.query(`
    INSERT INTO book_authors (book_id, author_id)
    VALUES ($1, $2)
  `, [bookId, authorId])

    // insert relation into user_books
    await db.query(`
    INSERT INTO user_books (user_id, book_id, read_date, categories)
    VALUES ($1, $2, $3, $4)
  `, [userId, bookId, book.readDate, book.categories])
    res.status(200).json({ success: true, message: 'Book sucessfully added.' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})
