import { db } from '../config/dbConfig.js'

export const getReviewsByBookId = async (bookId) => {
  const result = await db.query(
    `
    SELECT reviews.id, reviews.user_id, reviews.review, reviews.rating, reviews.date, users.email
    FROM reviews 
    JOIN users ON reviews.user_id = users.id
    WHERE reviews.book_id = (
      SELECT id FROM books WHERE id_api = $1
    ) 
    ORDER BY reviews.date DESC;
    `,
    [bookId]
  )
  return result.rows
}

export const deleteReviewById = async (reviewId) => {
  const result = await db.query(
    `
    DELETE FROM reviews
    WHERE id = $1
    RETURNING *;
    `,
    [reviewId]
  )
  return result.rows[0]
}

export const updateReviewById = async (reviewId, reviewText) => {
  const result = await db.query(
    `
    UPDATE reviews
    SET review = $1
    WHERE id = $2
    RETURNING *;
    `,
    [reviewText, reviewId]
  )
  return result.rows[0]
}

export const createReviewByBookId = async (bookId, reviewText, userId) => {
  const result = await db.query(
    `
    INSERT INTO reviews (book_id, review, user_id, date)
    VALUES (
      (SELECT id FROM books WHERE id_api = $1),
      $2, 
      $3, 
      CURRENT_TIMESTAMP
    )
    RETURNING *;
    `,
    [bookId, reviewText, userId]
  )
  return result.rows[0]
}

export const getAllReviews = async () => {
  const result = await db.query(
    `
    SELECT reviews.id, reviews.user_id, reviews.book_id, reviews.review, reviews.rating, reviews.date, 
           users.email AS user_email, books.title AS book_title
    FROM reviews
    JOIN users ON reviews.user_id = users.id
    JOIN books ON reviews.book_id = books.id
    ORDER BY reviews.date DESC;
    `
  )
  return result.rows
}
