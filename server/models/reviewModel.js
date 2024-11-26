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
