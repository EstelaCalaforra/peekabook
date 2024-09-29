import { createContext, useState } from 'react'
// import bookInfoResults from '../mocks/bookInfoResults.json'

export const BookSearchContext = createContext()

export function BookSearchProvider ({ children }) {
  // const allBooksResults = bookInfoResults.items
  const [bookSearch, setBookSearch] = useState([])
  const [bookQuery, setBookQuery] = useState('')
  const [bookId, setBookId] = useState(0)
  const [bookIndex, setBookIndex] = useState(0)

  return (
    <BookSearchContext.Provider value={{
      bookSearch,
      bookQuery,
      setBookQuery,
      setBookSearch,
      bookId,
      setBookId,
      bookIndex,
      setBookIndex
    }}
    >
      {children}
    </BookSearchContext.Provider>
  )
}
