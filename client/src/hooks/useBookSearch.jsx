import { useState, useContext } from 'react'
import axios from 'axios'
import { BookSearchContext } from '../context/bookSearchContext'

const defaultImageUrl = 'https://birkhauser.com/product-not-found.png' // this img is not free use oopsie

export function useBookSearch () {
  const [loading, setLoading] = useState(true)
  const { setBookSearch, bookSearch, bookId } = useContext(BookSearchContext)

  async function fetchBooksGoogleAPI (bookQuery) {
    try {
      const response = await axios.get('http://localhost:5000/get-books-google-api', {
        params: {
          bookQuery
        }
      })
      const items = response.data
      setBookSearch(items)
      setLoading(false)
      // addToDatabase(items)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  function findIndexById (array, id) {
    const findedIndex = array.findIndex(elemento => elemento.id === id)
    return findedIndex
  }

  const findedIndex = findIndexById(bookSearch, bookId)

  async function setBooksGoogleAPI (bookQuery) {
    await fetchBooksGoogleAPI(bookQuery)
  }

  return { setBooksGoogleAPI, findedIndex }
}
