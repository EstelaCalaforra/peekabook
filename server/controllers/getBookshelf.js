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

getBookshelfRouter.get('/', async (req, res) => {
  try {
    // eslint-disable-next-line no-multi-str
    const selectQuery = 'SELECT b.title, b.id_api, array_agg(DISTINCT a.fullname) AS authors, array_agg(c.name) AS categories\
        FROM books b\
        LEFT JOIN book_categories bc ON b.id = bc.book_id\
        LEFT JOIN categories c ON bc.category_id = c.id\
        LEFT JOIN book_authors ba ON b.id = ba.book_id\
        LEFT JOIN authors a ON ba.author_id = a.id GROUP\
        BY b.id'
    const result = await db.query(selectQuery)
    const books = result.rows
    res.json(books)
  } catch (error) {
    console.log(error)
  }
})
