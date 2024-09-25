import './styles/BookFindPage.css'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookSearchContext } from '../context/bookSearchContext'
import FiveStarsRatingIcon from '../assets/five-stars-rating.png'

const defaultImageUrl = 'https://birkhauser.com/product-not-found.png' // this img is not free use oopsie

export function BookFindPage () {
  function obtenerPrimeros80Caracteres (texto) {
    // Verificamos si la longitud del texto es mayor a 20
    if (texto.length > 80) {
      // Si es mayor, devolvemos solo los primeros 20 caracteres
      return texto.substring(0, 80) + '...'
    } else {
      // Si es menor o igual a 20, devolvemos el texto tal cual
      return texto
    }
  }

  const { bookSearch, setBookId } = useContext(BookSearchContext)
  console.log('bookSearch in BookFindPage', bookSearch)
  const navigate = useNavigate()

  function handleClick (event, id) {
    event.preventDefault()
    console.log('bookId in BookFindPage', id)
    setBookId(id)
    navigate('/ind-book')
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
                  {book.volumeInfo?.authors[0] || 'Unknown author.'}
                </p>
                <img className='bookinfo-five-stars-icon' src={FiveStarsRatingIcon} />
                <p className='bookfindpage-description'>
                  {book.volumeInfo?.description ? obtenerPrimeros80Caracteres(book.volumeInfo?.description) : 'No description available.'}
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
