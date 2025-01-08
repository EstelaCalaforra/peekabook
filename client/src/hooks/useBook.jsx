import { useState } from 'react'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL;

export function useBook () {
  const [book, setBook] = useState({})
  const [booksBySameAuthor, setBooksBySameAuthor] = useState()

  async function getBookFromDB (id) {
    try {
      const response = await axios.get(apiUrl + '/api/books/book/' + id)
      const resDataGetBook = response.data[0]
      setBook(resDataGetBook)
    } catch (error) {
      console.log(error)
    }
  }

  async function getBooksBySameAuthor (author) {
    if (author) {
      try {
        const response = await axios.get(apiUrl + '/api/external/search', {
          params: {
            bookQuery: author
          }
        })
        const { items } = response.data
        setBooksBySameAuthor(items)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return { book, getBookFromDB, getBooksBySameAuthor, booksBySameAuthor }
}
