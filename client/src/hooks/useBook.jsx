import { useState, useContext } from 'react'
import { BookSearchContext } from '../context/bookSearchContext'
import axios from 'axios'

export function useBook () {
  const [book, setBook] = useState({})
  const [booksBySameAuthor, setBooksBySameAuthor] = useState()
  const { bookId, setTotalPages } = useContext(BookSearchContext)

  async function getBookFromDB () {
    try {
      const response = await axios.get('http://localhost:5000/api/books/book/' + bookId)
      const resDataGetBook = response.data[0]
      console.log({ resDataGetBook })
      setBook(resDataGetBook)
      // setBooksBySameAuthor()
    } catch (error) {
      console.log(error)
    }
  }
  async function getBooksBySameAuthor (author, page = 1) {
    try {
      console.log({ author })
      const maxResults = 10 // Results per page
      const startIndex = (page - 1) * maxResults // Calculate initial index

      const response = await axios.get('http://localhost:5000/api/external/search', {
        params: {
          bookQuery: author,
          startIndex,
          maxResults
        }
      })
      const { items, totalItems } = response.data
      setBooksBySameAuthor(items)
      setTotalPages(Math.ceil(totalItems / maxResults)) // Calculate total pages
    } catch (error) {
      console.log(error)
    }
  }

  return { book, getBookFromDB, getBooksBySameAuthor, booksBySameAuthor }
}
