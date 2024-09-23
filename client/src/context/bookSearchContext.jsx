import { createContext, useState } from 'react'
import bookInfoResults from '../mocks/bookInfoResults.json'

export const BookSearchContext = createContext()

export function BookSearchProvider ({ children }) {
  const allBooksResults = bookInfoResults.items
  const [bookSearch, setBookSearch] = useState(allBooksResults)
  const [bookQuery, setBookQuery] = useState('')

  return (
    <BookSearchContext.Provider value={{
      bookSearch,
      bookQuery,
      setBookQuery,
      setBookSearch
    }}
    >
      {children}
    </BookSearchContext.Provider>
  )
}
