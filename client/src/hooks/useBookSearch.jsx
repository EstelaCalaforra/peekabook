import { useState, useContext } from 'react'
import axios from 'axios'
import { BookSearchContext } from '../context/bookSearchContext'

export function useBookSearch () {
  const [loading, setLoading] = useState(true)
  const { bookSearch, setBookSearch } = useContext(BookSearchContext)

  async function fetchBooksGoogleAPI (bookQuery) {
    try {
      const params = {
        q: bookQuery
      }
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', { params })
      const { items } = response.data
      console.log('items', items)
      setBookSearch(items)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  async function setBooksGoogleAPI (bookQuery) {
    await fetchBooksGoogleAPI(bookQuery)
  }

  return { setBooksGoogleAPI }
}
