import { useState, useContext } from 'react'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

export function useReview () {
  const [allReviewsFromBook, setAllReviewsFromBook] = useState([])
  const [allReviews, setAllReviews] = useState([])

  async function getReviewsFromDB (id) {
    try {
      const response = await axios.get(apiUrl + '/api/books/reviews/' + id)
      const resDataGetReviews = response.data.reviews
      setAllReviewsFromBook(resDataGetReviews)
    } catch (error) {
      console.log(error)
    }
  }

  async function getAllReviewsFromDB () {
    try {
      const response = await axios.get(apiUrl + '/api/books/reviews')
      const resData = response.data.reviews
      setAllReviews(resData)
    } catch (error) {
      console.error('Error fetching all reviews:', error)
    }
  }

  return { allReviewsFromBook, getReviewsFromDB, getAllReviewsFromDB, allReviews }
}
