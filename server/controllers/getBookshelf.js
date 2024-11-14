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

export const getBookshelfRouter = Router()

getBookshelfRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  console.log({ id })
  try {
    // eslint-disable-next-line no-multi-str
    const selectQuery =
    `SELECT b.title, b.id_api, b.cover, array_agg(DISTINCT a.fullname) AS authors, u.id AS user, ub.categories
        FROM books b
        LEFT JOIN book_authors ba ON b.id = ba.book_id
        LEFT JOIN authors a ON ba.author_id = a.id
        LEFT JOIN user_books ub ON b.id = ub.book_id
        LEFT JOIN users u ON ub.user_id = u.id
        WHERE u.id = $1
        GROUP BY b.id, u.id, ub.categories`
    const result = await db.query(selectQuery, [id])
    const books = result.rows
    console.log(books)
    res.json(books)
  } catch (error) {
    console.log(error)
  }
})
