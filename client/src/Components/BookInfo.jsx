import './styles/BookInfo.css'
import { useContext } from 'react'
import { BookSearchContext } from '../context/bookSearchContext'

const defaultImageUrl = 'https://birkhauser.com/product-not-found.png' // this img is not free use oopsie

export function BookInfo () {
  const { bookSearch } = useContext(BookSearchContext)

  return (
    <div className='page'>
      <ul className='books-info'>
        {bookSearch.map(book => (
          <li key={book.id} className='book'>
            <img className='bookinfo-cover' src={book.volumeInfo?.imageLinks?.smallThumbnail || defaultImageUrl} />
            <h2>{book.volumeInfo?.title || 'No title available'}</h2>
            <strong>{book.volumeInfo?.authors[0] || 'Unknown author'}</strong>
            {/* <p>{book.volumeInfo?.description || 'No description available'}</p> */}
          </li>
        ))}
      </ul>
    </div>
  )
}
