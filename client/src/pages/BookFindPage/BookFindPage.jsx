import './BookFindPage.css'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookSearchContext } from '../../context/bookSearchContext'
import FiveStarsRatingIcon from '../../assets/five-stars-rating.png'
import { useBookSearch } from '../../hooks/useBookSearch'

const defaultImageUrl = 'https://birkhauser.com/product-not-found.png' // this img is not free use oopsie

export function BookFindPage () {
  const {
    bookSearch,
    setBookId,
    currentPage,
    totalPages
  } = useContext(BookSearchContext)
  const { handlePageChange, renderPageNumbers } = useBookSearch()

  const navigate = useNavigate()

  function handleClick (event, id) {
    event.preventDefault()
    setBookId(id)
    navigate('/ind-book/' + id)
  }

  useEffect(() => {
    async function addSearchToDB (bookSearch) {
      console.log({ bookSearch })
      const response = await fetch('http://localhost:5000/api/books/add-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookSearch }) // apis handle data in json format
      })
    }

    addSearchToDB(bookSearch)
  }, [bookSearch])

  return (
    <div className='bookfind-page'>
      <ul className='books-info'>
        <p className='results'>
          Page {currentPage} of {totalPages}
        </p>
        {bookSearch.map((book) => (
          <li key={book.id} className='book'>
            <img
              className='bookinfo-cover'
              src={book.volumeInfo?.imageLinks?.smallThumbnail || defaultImageUrl}
              alt={book.volumeInfo?.title || 'No title available'}
            />
            <div className='bookinfo-info'>
              <div className='bookinfo-title-author'>
                <h2>{book.volumeInfo?.title || 'No title available'}</h2>
                <p className='bookfindpage-author'>
                  {book.volumeInfo?.authors?.[0] || 'Unknown author.'}
                </p>
                <img className='bookinfo-five-stars-icon' src={FiveStarsRatingIcon} alt='Rating' />
              </div>
              <a onClick={(event) => handleClick(event, book.id)} className='button'>
                Read more
              </a>
            </div>
          </li>
        ))}
        <hr />
        {/* Pagination controls */}
        <div className='pagination-controls'>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          {renderPageNumbers()}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </ul>
    </div>
  )
}
