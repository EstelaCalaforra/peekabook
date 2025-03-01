import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { BookSearchContext } from '../context/bookSearchContext'
import axios from 'axios'

export function useBookshelf () {
  const [bookshelfData, setBookshelfData] = useState([])
  const [loading, setLoading] = useState(true)
  const { userId, authToken, logout } = useAuth()
  const [hasBooks, setHasBooks] = useState(false)
  const [hasReviews, setHasReviews] = useState(false)
  const [reviews, setReviews] = useState([])
  const { categories, setCategories, setBookId } = useContext(BookSearchContext)

  const apiUrl = import.meta.env.VITE_API_URL

  async function fetchBookshelfData () {
    setLoading(true)
    try {
      const response = await axios.get(apiUrl + '/api/books/bookshelf/' + userId, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      const resDataGetBooks = response.data

      if (resDataGetBooks && resDataGetBooks.length > 0) {
        setHasBooks(true)
        const allCategories = await getCategories(resDataGetBooks)
        setCategories(allCategories)
        const allReviews = await getReviews(resDataGetBooks)
        if (allReviews) {
          setHasReviews(true)
          setReviews(allReviews)
        }
      } else {
        setHasBooks(false)
        setBookshelfData([])
      }
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 403) {
        logout()
      }
    } finally {
      setLoading(false)
    }
  }

  const updateReviewInDB = async (updatedReview) => {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        console.error('No token found. Please log in again.')
        return
      }
      const response = await axios.put(
        apiUrl + `/api/books/reviews/${updatedReview.review_id}`,
        { reviewText: updatedReview.review },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      )
      if (response.status === 200) {
        const updatedReviews = reviews.map(review =>
          review.review_id === updatedReview.review_id ? updatedReview : review
        )
        setReviews(updatedReviews)
        console.log(`Review with ID ${updatedReview.review_id} updated successfully`)
      }
    } catch (error) {
      console.error('Error updating review:', error)
    }
  }

  async function getCategories (response) {
    const cleanedData = response.map(book => {
      if (book.categories) {
        book.categories = book.categories
          .replace(/^{|}$/g, '')
          .split(',')
          .map(category => category.trim().replace(/^"|"$/g, ''))
          .filter(category => category)
      } else {
        book.categories = []
      }
      return book
    })
    setBookshelfData(cleanedData)
    const allCategories = [...new Set(cleanedData.flatMap(book => book.categories))]
    return allCategories
  }

  async function getReviews (response) {
    const allReviews = response.map(book => ({
      id_api: book.id_api,
      cover: book.cover,
      title: book.title,
      authors: book.authors[0],
      review_id: book.review_id,
      review: book.review,
      review_date: book.review_date
    }))
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

  async function deleteBookFromBookshelf (book) {
    try {
      const response = await axios.delete(
        `${apiUrl}/api/books/remove/${userId}/${book.id_api}`,
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      )
      if (response.status === 200) {
        setBookshelfData(bookshelfData.filter(item => item.id_api !== book.id_api))
        console.log(`Book with ID ${book.id_api} removed from bookshelf.`)
      }
    } catch (error) {
      console.error('Error deleting book from bookshelf:', error)
    }
  }

  useEffect(() => {
    if (userId && authToken) {
      fetchBookshelfData()
    }
  }, [userId, authToken])

  return {
    fetchBookshelfData,
    categories,
    reviews,
    handleClickOnCover,
    handleClickOnCategory,
    setBookshelfData,
    bookshelfData,
    hasBooks,
    hasReviews,
    updateReviewInDB,
    deleteBookFromBookshelf,
    loading
  }
}

