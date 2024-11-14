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

export const addBooksIfNotOnDBRouter = Router()
addBooksIfNotOnDBRouter.post('/', async (req, res) => {
  const { bookSearch } = req.body
  const books = bookSearch.map(book => (
    {
      id: book.id,
      title: book.volumeInfo?.title,
      authors: book.volumeInfo?.authors || [], // Ensure authors is always an array
      description: book.volumeInfo?.description,
      cover: book.volumeInfo?.imageLinks?.smallThumbnail
    }
  ))

  console.log({ bookSearch })
  console.log({ books })

  // Function to insert multiple books and their authors
  async function insertBooksAndAuthors (books) {
    try {
      await db.query('BEGIN')

      for (const book of books) {
        // Step 1: Insert each book into 'books', avoiding duplicates
        const insertBookQuery = `
          INSERT INTO books (title, id_api, cover, description)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (id_api) DO NOTHING
          RETURNING id;
        `
        const bookResult = await db.query(insertBookQuery, [
          book.title,
          book.id,
          book.cover,
          book.description
        ])

        const bookId = bookResult.rows[0]?.id
        if (!bookId) {
          console.log(`The book with id_api ${book.id} already exists in the database.`)
        } else {
          console.log(`Book inserted with ID: ${bookId}`)
        }

        // Step 2: Insert each author in 'authors', avoiding duplicates, and get their IDs
        const authorIds = []
        for (const authorName of book.authors) {
          const insertAuthorQuery = `
            INSERT INTO authors (fullname)
            VALUES ($1)
            RETURNING id;
          `
          const authorResult = await db.query(insertAuthorQuery, [authorName])

          const authorId = authorResult.rows[0]?.id
          if (authorId) {
            authorIds.push(authorId)
            console.log(`Author inserted with ID: ${authorId}`)
          } else {
            const existingAuthor = await db.query(
              'SELECT id FROM authors WHERE fullname = $1',
              [authorName]
            )
            authorIds.push(existingAuthor.rows[0].id)
            console.log(`Existing author with ID: ${existingAuthor.rows[0].id}`)
          }
        }

        // Step 3: Insert relationships into 'book_authors', avoiding duplicates
        for (const authorId of authorIds) {
          if (bookId) {
            const insertBookAuthorQuery = `
            INSERT INTO book_authors (book_id, author_id)
            VALUES ($1, $2)
            ON CONFLICT (book_id, author_id) DO NOTHING;
          `
            await db.query(insertBookAuthorQuery, [bookId, authorId])
            console.log(`Relationship inserted between book ID ${bookId} and author ID ${authorId}`)
          }
        }
      }

      // Commit the transaction
      await db.query('COMMIT')
    } catch (error) {
      await db.query('ROLLBACK')
      console.error('Error inserting data:', error)
      if (error.stack) {
        console.error('Stack trace:', error.stack)
      }
    }
  }

  insertBooksAndAuthors(books)
    .then(() => {
      console.log('Insertion completed')
      res.status(200).send('Books and authors inserted successfully')
    })
    .catch((error) => {
      console.error('Insertion error:', error)
      res.status(500).send('Error inserting books and authors')
    })
})
