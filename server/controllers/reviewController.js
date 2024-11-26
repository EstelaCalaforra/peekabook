import {
  getReviewsByBookId
} from '../models/reviewModel.js'

export const getReviews = async (req, res) => {
  const bookId = req.params.id
  console.log({ bookId })
  try {
    const reviews = await getReviewsByBookId(bookId)
    res.status(201).json({
      success: true,
      message: 'Reviews fetched successfully',
      reviews
    })
    console.log({ reviews })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    res.status(500).send('Error fetching reviews.')
  }
}
