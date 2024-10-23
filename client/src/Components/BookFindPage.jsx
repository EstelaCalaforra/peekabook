import './styles/BookFindPage.css'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookSearchContext } from '../context/bookSearchContext'
import FiveStarsRatingIcon from '../assets/five-stars-rating.png'
import { getFirst80Characters } from '../services/getFirst80Characters'
import axios from 'axios'

const defaultImageUrl = 'https://birkhauser.com/product-not-found.png' // this img is not free use oopsie

export function BookFindPage () {
  const { bookSearch, setBookId } = useContext(BookSearchContext)
  const navigate = useNavigate()

  function handleClick (event, id) {
    event.preventDefault()
    setBookId(id)
    navigate('/ind-book/' + id)
  }

  return (
    <div className='page'>
      <ul className='books-info'>
        {bookSearch.map(book => (
          <li key={book.id} className='book'>
            <img className='bookinfo-cover' src={book.volumeInfo?.imageLinks?.smallThumbnail || defaultImageUrl} />
            <div className='bookinfo-info'>
              <div className='bookinfo-title-author'>
                <h2>{book.volumeInfo?.title || 'No title available'}</h2>
                <p className='bookfindpage-author'>
                  {book.volumeInfo?.authors?.[0] || 'Unknown author.'}
                </p>
                <img className='bookinfo-five-stars-icon' src={FiveStarsRatingIcon} />
                <p className='bookfindpage-description'>
                  {book.volumeInfo?.description ? getFirst80Characters(book.volumeInfo?.description) : 'No description available.'}
                </p>
              </div>
              <a onClick={(event) => handleClick(event, book.id)} className='button'>Read more</a>
            </div>

          </li>
        ))}
      </ul>
    </div>
  )
}
