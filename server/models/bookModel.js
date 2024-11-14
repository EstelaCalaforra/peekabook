import { db } from '../config/dbConfig.js'

export const findBookByIdApi = async (idApi) => {
  const result = await db.query('SELECT id FROM books WHERE id_api = $1', [idApi])
  return result.rows[0]
}

export const findBookByTitle = async (title) => {
  const result = await db.query('SELECT id FROM books WHERE title = $1', [title])
  return result.rows[0]
}

export const addUserBookRelation = async (userId, bookId, readDate, categories) => {
  await db.query(
      `INSERT INTO user_books (user_id, book_id, read_date, categories)
       VALUES ($1, $2, $3, $4)`,
      [userId, bookId, readDate, categories]
  )
}
