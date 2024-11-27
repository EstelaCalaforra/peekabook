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

export const getBookDetailsByIdApi = async (idApi) => {
  const selectQuery = `
    SELECT 
      b.title, 
      b.id_api, 
      b.cover, 
      b.description, 
      array_agg(DISTINCT a.fullname) AS authors
    FROM books b
    LEFT JOIN book_authors ba ON b.id = ba.book_id
    LEFT JOIN authors a ON ba.author_id = a.id
    WHERE b.id_api = $1
    GROUP BY b.id
  `
  try {
    const result = await db.query(selectQuery, [idApi])
    return result.rows
  } catch (error) {
    console.error('Error fetching book details by id_api:', error)
    throw error
  }
}

export const getReviewsByBookId = async (bookId) => {
  const result = await db.query(
    `
    SELECT reviews.id, reviews.user_id, reviews.review, reviews.rating, reviews.date, users.email
    FROM reviews JOIN users ON reviews.user_id = users.id
    WHERE reviews.book_id = $1 ORDER BY reviews.date DESC;
    `
    ,
    [bookId]
  )
  return result.rows
}

export const getBookshelfByUserId = async (userId) => {
  const selectQuery = `
    SELECT 
      b.title, 
      b.id_api, 
      b.cover, 
      array_agg(DISTINCT a.fullname) AS authors, 
      ub.categories, 
      r.review, 
      r.rating, 
      r.date AS review_date
    FROM books b
    LEFT JOIN book_authors ba ON b.id = ba.book_id
    LEFT JOIN authors a ON ba.author_id = a.id
    LEFT JOIN user_books ub ON b.id = ub.book_id
    LEFT JOIN reviews r ON b.id = r.book_id AND ub.user_id = r.user_id
    WHERE ub.user_id = $1
    GROUP BY b.id, ub.categories, r.review, r.rating, r.date
  `

  try {
    const result = await db.query(selectQuery, [userId])
    return result.rows
  } catch (error) {
    console.error('Error fetching bookshelf data from database:', error)
    throw error
  }
}
