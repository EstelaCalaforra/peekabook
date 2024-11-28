import { useContext } from 'react'
import axios from 'axios'
import { BookSearchContext } from '../context/bookSearchContext'
import { useNavigate } from 'react-router-dom'

export function useBookSearch () {
  const { bookQuery, setBookSearch, setBookQuery } = useContext(BookSearchContext)
  const navigate = useNavigate()
  async function fetchBooksGoogleAPI (bookQuery) {
    try {
      const response = await axios.get('http://localhost:5000/api/external/search', {
        params: {
          bookQuery
        }
      })
      const items = response.data
      setBookSearch(items)
    } catch (error) {
      console.log(error)
    }
  }

  async function setBooksGoogleAPI (bookQuery) {
    await fetchBooksGoogleAPI(bookQuery)
  }

  function handleSubmit (event) {
    event.preventDefault()
    setBooksGoogleAPI(bookQuery)
    navigate('/book-search')
  }

  function handleChange (event) {
    const newBookQuery = event.target.value
    setBookQuery(newBookQuery)
  }

  return { handleSubmit, handleChange }
}
