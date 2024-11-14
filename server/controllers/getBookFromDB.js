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

export const getBookFromDBRouter = Router()

getBookFromDBRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  console.log({ id })
  try {
    // eslint-disable-next-line no-multi-str
    const selectQuery =
      `SELECT b.title, b.id_api, b.cover, b.description, array_agg(DISTINCT a.fullname) AS authors
          FROM books b
          LEFT JOIN book_authors ba ON b.id = ba.book_id
          LEFT JOIN authors a ON ba.author_id = a.id
          WHERE b.id_api = $1
          GROUP BY b.id`
    const result = await db.query(selectQuery, [id])
    const book = result.rows
    console.log(book)
    res.json(book)
  } catch (error) {
    console.log(error)
  }
})
