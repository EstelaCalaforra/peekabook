import {
  getReviewsByBookId,
  deleteReviewById,
  updateReviewById,
  getAllReviews
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

export const deleteReview = async (req, res) => {
  const reviewId = req.params.id
  try {
    const deletedReview = await deleteReviewById(reviewId)
    if (!deletedReview) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      })
    }
    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
      deletedReview
    })
  } catch (error) {
    console.error('Error deleting review:', error)
    res.status(500).json({
      success: false,
      message: 'Error deleting review'
    })
  }
}

export const updateReview = async (req, res) => {
  const { reviewText } = req.body // Nuevo texto de la reseña
  const reviewId = req.params.id // ID de la reseña a actualizar

  try {
    const updatedReview = await updateReviewById(reviewId, reviewText)
    if (!updatedReview) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      })
    }
    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      updatedReview
    })
  } catch (error) {
    console.error('Error updating review:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating review'
    })
  }
}

export const getAllReviewsController = async (req, res) => {
  try {
    const allReviews = await getAllReviews()
    res.status(200).json({
      success: true,
      message: 'All reviews fetched successfully',
      reviews: allReviews
    })
    console.log({ allReviews })
  } catch (error) {
    console.error('Error fetching all reviews:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching all reviews'
    })
  }
}