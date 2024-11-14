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
  const { userId, bookAdded } = req.body
  console.log({ userId })
  console.log({ bookAdded })

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
      SELECT id FROM books WHERE (id_api)=$1
    `, [bookAdded.id])

    const bookId = bookResult.rows[0]?.id || (await db.query('SELECT id FROM books WHERE title = $1', [bookAdded.title])).rows[0].id

    // insert relation into user_books
    await db.query(`
    INSERT INTO user_books (user_id, book_id, read_date, categories)
    VALUES ($1, $2, $3, $4)
  `, [userId, bookId, bookAdded.readDate, bookAdded.categories])
    console.log(`Relationship inserted between book ID ${bookId} and user ID ${userId}`)
    res.status(200).json({ success: true, message: 'Book sucessfully added.' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})
