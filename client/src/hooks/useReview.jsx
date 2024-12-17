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

  return { allReviews, getReviewsFromDB }
}
