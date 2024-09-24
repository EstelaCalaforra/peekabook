import './styles/IndividualBookPage.css'
import { useContext } from 'react'
import { BookSearchContext } from '../context/bookSearchContext'

export function IndividualBookPage () {
  const { bookSearch, bookId } = useContext(BookSearchContext)
  console.log('bookId in IndividualBookPage', bookId)
  return (
    <>
      <p>{bookSearch[bookId].title}</p>
    </>
  )
}
