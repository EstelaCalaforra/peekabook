import './styles/BookFindPage.css'
import { useContext, useNavigate } from 'react'
import { BookSearchContext } from '../context/bookSearchContext'

const defaultImageUrl = 'https://birkhauser.com/product-not-found.png' // this img is not free use oopsie

export function BookFindPage () {
  const { bookSearch, setBookId } = useContext(BookSearchContext)
  // const navigate = useNavigate()

  function handleClick (event, id) {
    event.preventDefault()
    console.log('bookId in BookFindPage', id)
    setBookId(id)
    // navigate()
  }

  return (
    <div className='page'>
      <ul className='books-info'>
        {bookSearch.map(book => (
          <li key={book.id} className='book column'>
            <img className='bookinfo-cover' src={book.volumeInfo?.imageLinks?.smallThumbnail || defaultImageUrl} />
            <h2>{book.volumeInfo?.title || 'No title available'}</h2>
            <strong>{book.volumeInfo?.authors[0] || 'Unknown author'}</strong>
            <a onClick={(event) => handleClick(event, book.id)} className='button' href='/ind-book'>Read more</a>
            {/* <p>{book.volumeInfo?.description || 'No description available'}</p> */}
          </li>
        ))}
      </ul>
    </div>
  )
}
