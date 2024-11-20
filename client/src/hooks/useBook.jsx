import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { BookSearchContext } from '../context/bookSearchContext'
import axios from 'axios'

export function useBook () {
  const [book, setBook] = useState({})
  const { bookId } = useContext(BookSearchContext)

  async function getBookFromDB () {
    try {
      const response = await axios.get('http://localhost:5000/api/get-book/' + bookId)
      const resDataGetBook = response.data[0]
      setBook(resDataGetBook)
    } catch (error) {
      console.log(error)
    }
  }

  console.log({ book })
  return { book, getBookFromDB }
}
