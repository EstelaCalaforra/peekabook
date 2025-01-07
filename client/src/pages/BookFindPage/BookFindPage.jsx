import './BookFindPage.css'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BookSearchContext } from '../../context/bookSearchContext'
import { useBookSearch } from '../../hooks/useBookSearch'
import { BookCard } from '../../components/BookCard/BookCard.jsx'
import { PaginationControls } from '../../components/PaginationControls/PaginationControls.jsx'

export function BookFindPage () {
  const {
    bookSearch,
    currentPage,
    totalPages
  } = useContext(BookSearchContext)
  const { handlePageChange, handleClickReadMore, fetchBooksGoogleAPI } = useBookSearch()
  const { bookQuery } = useParams()

  useEffect(() => {
    if (bookQuery) {
      fetchBooksGoogleAPI(bookQuery)
    }
  }, [bookQuery])

  return (
    <div className='bookfind-page'>
      <div className='container'>
        <p className='results'>
          Page {currentPage} of {totalPages}
        </p>
        <ul className='books-info'>
          {bookSearch?.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClickReadMore={handleClickReadMore}
            />
          ))}
        </ul>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
