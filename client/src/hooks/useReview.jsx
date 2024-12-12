import { useState, useContext } from 'react'
import { BookSearchContext } from '../context/bookSearchContext'
import axios from 'axios'

export function useReview () {
  const [allReviews, setAllReviews] = useState([])
  const { bookId } = useContext(BookSearchContext)

  async function getReviewsFromDB () {
    try {
      const response = await axios.get('http://localhost:5000/api/books/reviews/' + bookId)
      const resDataGetReviews = response.data.reviews
      setAllReviews(resDataGetReviews)
      console.log({ resDataGetReviews })
    } catch (error) {
      console.log(error)
    }
  }

  // async function deleteReviewFromDB (reviewId) {
  //   try {
  //     await axios.delete(`http://localhost:5000/api/books/reviews/${reviewId}`)
  //     setAllReviews(allReviews.filter(review => review.review_id !== reviewId))
  //     console.log(`Review with ID ${reviewId} deleted successfully`)
  //   } catch (error) {
  //     console.error('Error deleting review:', error)
  //   }
  // }
  return { allReviews, getReviewsFromDB }
}
