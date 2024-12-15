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
  return result.rows[0] // Devuelve la reseña actualizada
}
