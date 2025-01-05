import { useContext } from 'react'
import axios from 'axios'
import { BookSearchContext } from '../context/bookSearchContext'
import { useNavigate } from 'react-router-dom'

export function useBookSearch () {
  const { bookQuery, setBookSearch, setBookQuery, setCurrentPage, setTotalPages, setBookId } = useContext(BookSearchContext)
  const navigate = useNavigate()

  async function fetchBooksGoogleAPI (bookQuery, page = 1) {
    try {
      const maxResults = 12 // Results per page
      const startIndex = (page - 1) * maxResults // Calculate initial index
      const response = await axios.get('http://localhost:5000/api/external/search', {
        params: {
          bookQuery,
          startIndex,
          maxResults
        }
      })
      const { items, totalItems } = response.data
      setBookSearch(items)
      setTotalPages(Math.ceil(totalItems / maxResults)) // Calculate total pages
      addSearchToDB(items)
    } catch (error) {
      console.log(error)
    }
  }

  async function addSearchToDB (bookSearch) {
    await fetch('http://localhost:5000/api/books/add-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bookSearch })
    })
  }

  function handlePageChange (newPage) {
    setCurrentPage(newPage)
    fetchBooksGoogleAPI(bookQuery, newPage) // Call api with new page
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

  function handleClickReadMore (event, id) {
    event.preventDefault()
    setBookId(id)
    navigate('/ind-book/' + id)
  }

  return { handleSubmit, handleChange, handlePageChange, fetchBooksGoogleAPI, handleClickReadMore }
}
