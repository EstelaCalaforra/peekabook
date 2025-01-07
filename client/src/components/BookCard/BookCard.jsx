import FiveStarsRatingIcon from '../../assets/five-stars-rating.png'
import { Link } from 'react-router-dom'
const defaultImageUrl = 'https://birkhauser.com/product-not-found.png'

export function BookCard ({ book, onClickReadMore }) {
  return (
    <li className='book'>
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
        <div className='read-more'>
          <Link onClick={(event) => onClickReadMore(event, book.id)} className='button'>
            Read more
          </Link>
        </div>
      </div>
    </li>
  )
}
