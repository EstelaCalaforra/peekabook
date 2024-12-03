import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { BookSearchContext } from '../context/bookSearchContext'
import axios from 'axios'

export function useBookshelf () {
  const [bookshelfData, setBookshelfData] = useState([])
  const { userId, authToken, isAuthenticated } = useAuth()
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
          console.log({ allCategories })
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
          navigate('/login')
        }
      }
    }
    fetchBookshelfData()
  }, [])

  async function getCategories (response) {
    const cleanedData = response.map(book => {
      // Limpiamos y convertimos el campo `categories` en un array
      if (book.categories) {
        book.categories = book.categories
          .replace(/^{|}$/g, '') // Eliminar las llaves `{}` al inicio y final
          .split(',') // Dividir en elementos individuales
          .map(category => category.trim().replace(/^"|"$/g, '')) // Eliminar comillas
          .filter(category => category) // Eliminar categorías vacías
      } else {
        book.categories = [] // Si es `null`, lo convertimos en un array vacío
      }
      return book
    })
    setBookshelfData(cleanedData)
    const allCategories = [
      ...new Set(cleanedData.flatMap(book => book.categories))
    ]
    console.log({ allCategories })
    console.log({ bookshelfData })
    return allCategories
  }

  async function getReviews (response) {
    const allReviews = response.map(book => {
      return {
        id_api: book.id_api,
        cover: book.cover,
        title: book.title,
        authors: book.authors[0],
        review: book.review,
        review_date: book.review_date
      }
    })
    console.log({ allReviews })
    return allReviews
  }

  const navigate = useNavigate()
  function handleClickOnCover (idApi) {
    setBookId(idApi)
    navigate('/ind-book/' + idApi)
  }

  function handleClickOnCategory ({ category }) {
    console.log({ category })
    navigate(`/bookshelf/${userId}/${category}`, { state: category })
  }

  return { categories, getCategories, reviews, handleClickOnCover, handleClickOnCategory, bookshelfData, hasBooks, hasReviews }
}
