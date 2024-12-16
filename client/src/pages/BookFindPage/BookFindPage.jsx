import './BookFindPage.css'
import { useContext } from 'react'
import { BookSearchContext } from '../../context/bookSearchContext'
import { useBookSearch } from '../../hooks/useBookSearch'
import { BookCard } from '../../components/BookCard/BookCard.jsx'
import { PaginationControls } from '../../components/PaginationControls/PaginationControls.jsx'  // Importa el componente

export function BookFindPage () {
  const {
    bookSearch,
    currentPage,
    totalPages
  } = useContext(BookSearchContext)
  const { handlePageChange, handleClickReadMore } = useBookSearch()

  return (
    <div className='bookfind-page'>
      <ul className='books-info'>
        <p className='results'>
          Page {currentPage} of {totalPages}
        </p>
        {bookSearch.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onClickReadMore={handleClickReadMore}
          />
        ))}
        <hr />
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </ul>
    </div>
  )
}
