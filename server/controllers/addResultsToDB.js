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

export const addResultsToDBRouter = Router()

addResultsToDBRouter.post('/', async (req, res) => {
  const { bookData } = req.body
  console.log({ bookData })
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
