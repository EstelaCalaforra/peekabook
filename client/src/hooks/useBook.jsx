import { useState, useContext } from 'react'
import { BookSearchContext } from '../context/bookSearchContext'
import axios from 'axios'

export function useBook () {
  const [book, setBook] = useState({})
  const [allReviews, setAllReviews] = useState({})
  const { bookId } = useContext(BookSearchContext)

  async function getBookFromDB () {
    try {
      const response = await axios.get('http://localhost:5000/api/get-book/' + bookId)
      const resDataGetBook = response.data[0]
      setBook(resDataGetBook)
    } catch (error) {
      console.log(error)
    }
  }

  let resDataGetReviews
  async function getReviewsFromDB () {
    try {
      const response = await axios.get('http://localhost:5000/api/books/reviews' + bookId)
      resDataGetReviews = response.data[0]
      setAllReviews(resDataGetReviews)
      console.log({ resDataGetReviews })
    } catch (error) {
      console.log(error)
    }
  }
  console.log({ allReviews })
  return { book, getBookFromDB, getReviewsFromDB, allReviews }
}
