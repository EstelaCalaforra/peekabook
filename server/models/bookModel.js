import { db } from '../config/dbConfig.js'

// Find
export const findBookByIdApi = async (idApi) => {
  const result = await db.query('SELECT id FROM books WHERE id_api = $1', [idApi])
  return result.rows[0]
}
export const findBookByTitle = async (title) => {
  const result = await db.query('SELECT id FROM books WHERE title = $1', [title])
  return result.rows[0]
}
export const getExistingAuthor = async (authorName) => {
  const result = await db.query(
    'SELECT id FROM authors WHERE fullname = $1',
    [authorName]
  )
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
    r.id AS review_id, 
    r.review, 
    r.rating, 
    r.date AS review_date
  FROM books b
  LEFT JOIN book_authors ba ON b.id = ba.book_id
  LEFT JOIN authors a ON ba.author_id = a.id
  LEFT JOIN user_books ub ON b.id = ub.book_id
  LEFT JOIN reviews r ON b.id = r.book_id AND ub.user_id = r.user_id
  WHERE ub.user_id = $1
  GROUP BY b.id, ub.categories, r.id, r.review, r.rating, r.date
`

  try {
    const result = await db.query(selectQuery, [userId])
    return result.rows
  } catch (error) {
    console.error('Error fetching bookshelf data from database:', error)
    throw error
  }
}

// Insert
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

export const insertReview = async (userId, bookId, reviewText, rating) => {
  const insertReviewQuery = `
    INSERT INTO reviews (user_id, book_id, review, rating)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
  `
  const result = await db.query(insertReviewQuery, [userId, bookId, reviewText, rating])
  return result.rows[0]?.id
}

// User_book relations
export const addUserBookRelation = async (userId, bookId, readDate, categories) => {
  await db.query(
      `INSERT INTO user_books (user_id, book_id, read_date, categories)
       VALUES ($1, $2, $3, $4)`,
      [userId, bookId, readDate, categories]
  )
}

export const updateUserBookRelation = async (userId, bookId, readDate, categories, reviewText, rating) => {
  // Verify if already exists a user_book relation
  const userBookRelation = await db.query(
    'SELECT 1 FROM user_books WHERE user_id = $1 AND book_id = $2',
    [userId, bookId]
  )

  if (userBookRelation.rows.length > 0) {
    // If exists, update categories
    await db.query(
      `UPDATE user_books
       SET categories = $3
       WHERE user_id = $1 AND book_id = $2`,
      [userId, bookId, categories]
    )

    if (reviewText || rating) {
      // Update review fields if there is reviewText or rating
      console.log({ reviewText }) // debug: has text
      console.log({ userId })
      console.log({ bookId })
      // esta intentando editar una review que no existe porque aunque se añadio el libro, nunca se
      // añadio la review y la relacion no existe
      const response = await db.query(
        `UPDATE reviews
         SET review = $3, rating = $4, date = CURRENT_TIMESTAMP
         WHERE user_id = $1 AND book_id = $2
         RETURNING *`,
        [userId, bookId, reviewText, rating]
      )
      const res = response.rows
      console.log({ res })
    }
  } else {
    // If there is no user_book relation
    await db.query(
      `INSERT INTO user_books (user_id, book_id, read_date, categories)
       VALUES ($1, $2, $3, $4)`,
      [userId, bookId, readDate, categories]
    )

    await db.query(
        `INSERT INTO reviews (user_id, book_id, review, rating)
         VALUES ($1, $2, $3, $4)`,
        [userId, bookId, reviewText, rating]
    )
  }
}

export const deleteUserBookRelation = async (userId, bookIdApi) => {
  const book = await findBookByIdApi(bookIdApi)
  const bookId = book.id
  await db.query(
    'DELETE FROM reviews WHERE user_id = $1 AND book_id = $2',
    [userId, bookId]
  )
  const result = await db.query(
    'DELETE FROM user_books WHERE user_id = $1 AND book_id = $2 RETURNING book_id',
    [userId, bookId]
  )
  return result.rows[0]?.book_id
}

// Book_author relations
export const insertBookAuthorRelation = async (bookId, authorId) => {
  const insertRelationQuery = `
    INSERT INTO book_authors (book_id, author_id)
    VALUES ($1, $2)
    ON CONFLICT (book_id, author_id) DO NOTHING;
  `
  await db.query(insertRelationQuery, [bookId, authorId])
  console.log(`Relationship inserted between book ID ${bookId} and author ID ${authorId}`)
}
