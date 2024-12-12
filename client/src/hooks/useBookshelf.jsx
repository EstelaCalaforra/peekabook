import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { BookSearchContext } from '../context/bookSearchContext'
import axios from 'axios'

export function useBookshelf () {
  const [bookshelfData, setBookshelfData] = useState([])
  const { userId, authToken, isAuthenticated, logout } = useAuth()
  const [hasBooks, setHasBooks] = useState(false)
  const [hasReviews, setHasReviews] = useState(false)
  const [reviews, setReviews] = useState({})
  const { categories, setCategories, setBookId } = useContext(BookSearchContext)

  useEffect(() => {
    const fetchBookshelfData = async () => {
      try {
        console.log({ userId })
        console.log({ authToken })
        console.log({ isAuthenticated })

        const response = await axios.get('http://localhost:5000/api/books/bookshelf/' + userId, {
          headers: { Authorization: `Bearer ${authToken}` }
        })
        const resDataGetBooks = response.data

        // If there are books in the response, set the bookshelf data and update hasData
        if (resDataGetBooks && resDataGetBooks.length > 0) {
          setHasBooks(true) // Update hasData only if there is valid data
          const allCategories = await getCategories(resDataGetBooks)
          setCategories(allCategories)
          const allReviews = await getReviews(resDataGetBooks)
          if (allReviews) {
            setHasReviews(true)
            setReviews(allReviews)
          }
        } else {
          setHasBooks(false)
        }
      } catch (error) {
        console.log(error)
        if (error.response && error.response.status === 403) {
          logout()
        }
      }
    }
    fetchBookshelfData()
  }, [])

  async function getCategories (response) {
    const cleanedData = response.map(book => {
      // Clean and turn field 'catgories' into an array
      if (book.categories) {
        book.categories = book.categories
          .replace(/^{|}$/g, '') // Remove `{}`
          .split(',') // Divide in individual elements
          .map(category => category.trim().replace(/^"|"$/g, '')) // Remove ""
          .filter(category => category) // Remove empty categories
      } else {
        book.categories = [] // If 'null', turn into an empty array
      }
      return book
    })
    setBookshelfData(cleanedData)
    const allCategories = [
      ...new Set(cleanedData.flatMap(book => book.categories))
    ]
    return allCategories
  }

  async function getReviews (response) {
    const allReviews = response.map(book => {
      return {
        id_api: book.id_api,
        cover: book.cover,
        title: book.title,
        authors: book.authors[0],
        review_id: book.review_id,
        review: book.review,
        review_date: book.review_date
      }
    })
    return allReviews
  }

  const navigate = useNavigate()
  function handleClickOnCover (idApi) {
    setBookId(idApi)
    navigate(`/ind-book/${idApi}`, { state: idApi })
  }

  function handleClickOnCategory ({ category }) {
    navigate(`/bookshelf/${userId}/${category}`, { state: category })
  }

  async function deleteReviewFromDB (reviewId) {
    try {
      await axios.delete(`http://localhost:5000/api/books/reviews/${reviewId}`)
      setReviews(reviews.filter(review => review.review_id !== reviewId))
      console.log(`Review with ID ${reviewId} deleted successfully`)
    } catch (error) {
      console.error('Error deleting review:', error)
    }
  }

  return {
    categories,
    getCategories,
    reviews,
    handleClickOnCover,
    handleClickOnCategory,
    bookshelfData,
    hasBooks,
    hasReviews,
    deleteReviewFromDB
  }
}
