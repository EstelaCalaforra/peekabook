import { db } from '../config/dbConfig.js'

// Obtener las reseñas por ID del libro
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

// Eliminar una reseña por ID
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

// Nueva función para actualizar una reseña
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

export const updateOrCreateReview = async (bookId, reviewText, userId) => {
  const existingReview = await db.query(
    'SELECT * FROM reviews WHERE book_id = (SELECT id FROM books WHERE id_api = $1) AND user_id = $2',
    [bookId, userId]
  )

  if (existingReview.rows.length > 0) {
    const updatedReview = await updateReviewById(existingReview.rows[0].id, reviewText)
    return updatedReview
  } else {
    const newReview = await createReviewByBookId(bookId, reviewText, userId)
    return newReview
  }
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
  return result.rows // Devuelve todas las reseñas
}
