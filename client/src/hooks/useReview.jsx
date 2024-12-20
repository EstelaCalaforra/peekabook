import { useState, useContext } from 'react'
import { BookSearchContext } from '../context/bookSearchContext'
import axios from 'axios'

export function useReview () {
  const [allReviewsFromBook, setAllReviewsFromBook] = useState([])
  const [allReviews, setAllReviews] = useState([])
  const { bookId } = useContext(BookSearchContext)

  async function getReviewsFromDB () {
    try {
      const response = await axios.get('http://localhost:5000/api/books/reviews/' + bookId)
      const resDataGetReviews = response.data.reviews
      setAllReviewsFromBook(resDataGetReviews)
      console.log({ resDataGetReviews })
    } catch (error) {
      console.log(error)
    }
  }

  async function getAllReviewsFromDB () {
    try {
      const response = await axios.get('http://localhost:5000/api/books/reviews')
      const resData = response.data.reviews
      setAllReviews(resData)
      console.log('All Reviews:', resData)
    } catch (error) {
      console.error('Error fetching all reviews:', error)
    }
  }

  return { allReviewsFromBook, getReviewsFromDB, getAllReviewsFromDB, allReviews }
}
