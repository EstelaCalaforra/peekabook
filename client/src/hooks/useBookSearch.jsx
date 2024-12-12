import { useContext } from 'react'
import axios from 'axios'
import { BookSearchContext } from '../context/bookSearchContext'
import { useNavigate } from 'react-router-dom'

export function useBookSearch () {
  const { bookQuery, setBookSearch, setBookQuery, currentPage, setCurrentPage, totalPages, setTotalPages } = useContext(BookSearchContext)
  const navigate = useNavigate()

  async function fetchBooksGoogleAPI (bookQuery, page = 1) {
    try {
      const maxResults = 10 // Results per page
      const startIndex = (page - 1) * maxResults // Calculate initial index
      console.log({ bookQuery })
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
    } catch (error) {
      console.log(error)
    }
  }

  function handlePageChange (newPage) {
    setCurrentPage(newPage)
    fetchBooksGoogleAPI(bookQuery, newPage) // Call api with new page
  }

  function renderPageNumbers () {
    const maxVisiblePages = 5 // Maximum number of page buttons to display
    const pages = []
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`page-number ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      )
    }

    return pages
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

  return { handleSubmit, handleChange, handlePageChange, renderPageNumbers, fetchBooksGoogleAPI }
}
