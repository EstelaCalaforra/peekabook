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

export const insertBook = async (book) => {
  const insertBookQuery = `
    INSERT INTO books (title, id_api, cover, description)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (id_api) DO NOTHING
    RETURNING id;
  `
  const result = await db.query(insertBookQuery, [
    book.title,
    book.id,
    book.cover,
    book.description
  ])
  return result.rows[0]?.id
}

export const insertAuthor = async (authorName) => {
  const insertAuthorQuery = `
    INSERT INTO authors (fullname)
    VALUES ($1)
    RETURNING id;
  `
  const result = await db.query(insertAuthorQuery, [authorName])
  return result.rows[0]?.id
}

export const getExistingAuthor = async (authorName) => {
  const result = await db.query(
    'SELECT id FROM authors WHERE fullname = $1',
    [authorName]
  )
  return result.rows[0]?.id
}

export const insertBookAuthorRelation = async (bookId, authorId) => {
  const insertRelationQuery = `
    INSERT INTO book_authors (book_id, author_id)
    VALUES ($1, $2)
    ON CONFLICT (book_id, author_id) DO NOTHING;
  `
  await db.query(insertRelationQuery, [bookId, authorId])
  console.log(`Relationship inserted between book ID ${bookId} and author ID ${authorId}`)
}

export const insertReview = async (userId, bookId, reviewText, rating) => {
  const insertReviewQuery = `
    INSERT INTO reviews (user_id, book_id, review, rating)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
  `
  const result = await db.query(insertReviewQuery, [userId, bookId, reviewText, rating])
  return result.rows[0]?.id
}
