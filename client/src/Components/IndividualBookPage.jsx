import './styles/IndividualBookPage.css'
import { useContext, useEffect, useState } from 'react'
import { BookSearchContext } from '../context/bookSearchContext'

export function IndividualBookPage () {
  const { bookSearch, bookId } = useContext(BookSearchContext)
  console.log('bookSearch in IndividualBookPage', bookSearch)
  console.log('bookId in IndividualBookPage', bookId)

  const [bookIndex, setBookIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  function findIndexById (array, id) {
    const findedIndex = array.findIndex(elemento => elemento.id === id)
    return findedIndex
  }

  const newBookIndex = findIndexById(bookSearch, bookId)
  console.log(newBookIndex)
  setBookIndex(newBookIndex)

  return (
    <>
      <p>{bookIndex ? bookSearch[bookIndex].title : 'Loading...'}</p>
    </>
  )
}
