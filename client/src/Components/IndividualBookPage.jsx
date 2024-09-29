import './styles/IndividualBookPage.css'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookSearchContext } from '../context/bookSearchContext'
import { useBookSearch } from '../hooks/useBookSearch'
import Divider from '../assets/botanical-divider-crop.png'

const defaultImageUrl = 'https://birkhauser.com/product-not-found.png' // this img is not free use oopsie

export function IndividualBookPage () {
  const { bookSearch, bookId, setBookId } = useContext(BookSearchContext)

  console.log('bookSearch in IndividualBookPage', bookSearch)
  console.log('bookId in IndividualBookPage', bookId)

  const { findedIndex } = useBookSearch()
  // console.log('bookIndex in IndividualBookPage', bookIndex)
  console.log('findedIndex in IndividualBookPage', findedIndex)
  // setBookIndex(findedIndex)
  console.log('bookSearch[findedIndex].volumeInfo.title', bookSearch[findedIndex].volumeInfo.title)
  const bookInList = typeof findedIndex === 'number'

  const navigate = useNavigate()

  function handleClick (event, id) {
    event.preventDefault()
    console.log('bookId in BookFindPage', id)
    setBookId(id)
    navigate('/ind-book')
  }

  return (
    <div className='individual-book-page'>
      <section className='individual-book-page-row'>
        <div className='individual-book-page-column'>
          <img className='cover' src={bookInList ? bookSearch[findedIndex].volumeInfo?.imageLinks?.smallThumbnail || defaultImageUrl : 'Loading cover...'} />
          <a className='button'>Add to shelves</a>
          <a className='button buy'>Buy on Amazon</a>
        </div>
        <div className='individual-book-page-column'>
          <h1>{bookInList ? bookSearch[findedIndex].volumeInfo.title : 'Loading title...'}</h1>
          <h2>by {bookInList ? bookSearch[findedIndex].volumeInfo.authors[0] : 'Loading author...'}</h2>
          <img className='divider' src={Divider} />
          <p>{bookInList ? bookSearch[findedIndex].volumeInfo.publishedDate.split('-')[0] : 'Loading date...'}</p>
          <p>{bookInList ? bookSearch[findedIndex].volumeInfo.description : 'Loading description...'}</p>
        </div>
      </section>
      <section className='similar-books'>
        <h2>Similar books</h2>
        <div className='individual-book-page-row'>
          {(bookSearch).map(book => (
            <li key={book.id} className='book'>
              <a onClick={handleClick}><img className='cover' src={book.volumeInfo?.imageLinks?.smallThumbnail || defaultImageUrl} /></a>
            </li>
          ))}
        </div>
      </section>
    </div>
  )
}
