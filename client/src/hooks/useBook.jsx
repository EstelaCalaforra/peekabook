import { useState } from 'react'
import axios from 'axios'

export function useBook () {
  const [book, setBook] = useState({})
  const [booksBySameAuthor, setBooksBySameAuthor] = useState()

  async function getBookFromDB (id) {
    try {
      const response = await axios.get('http://localhost:5000/api/books/book/' + id)
      const resDataGetBook = response.data[0]
      setBook(resDataGetBook)
    } catch (error) {
      console.log(error)
    }
  }

  async function getBooksBySameAuthor (author) {
    console.log({ author })
    if (author) {
      try {
        const response = await axios.get('http://localhost:5000/api/external/search', {
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
