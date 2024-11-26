import { useContext } from 'react'
import axios from 'axios'
import { BookSearchContext } from '../context/bookSearchContext'

export function useBookSearch () {
  const { setBookSearch } = useContext(BookSearchContext)

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

  return { setBooksGoogleAPI }
}
