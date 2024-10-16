import './styles/IndividualBookPage.css'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookSearchContext } from '../context/bookSearchContext'
import { useBookSearch } from '../hooks/useBookSearch'
import Divider from '../assets/botanical-divider-crop.png'
import { useAuth } from '../context/AuthContext'

const defaultImageUrl = 'https://birkhauser.com/product-not-found.png' // this img is not free use oopsie

export function IndividualBookPage () {
  const { bookSearch, bookId, setBookId, categories } = useContext(BookSearchContext)
  const { isAuthenticated } = useAuth()
  console.log({ isAuthenticated })

  console.log('bookSearch in IndividualBookPage', bookSearch)
  console.log('bookId in IndividualBookPage', bookId)

  const { findedIndex } = useBookSearch()
  console.log({ findedIndex })
  console.log(bookSearch[findedIndex].volumeInfo.title)
  const bookInList = typeof findedIndex === 'number'

  const navigate = useNavigate()

  function handleClick (event, id) {
      event.preventDefault()
      console.log('bookId in BookFindPage', id)
      setBookId(id)
      navigate('/ind-book')  
  }

  const [added, setAdded] = useState(false)
  function handleClickAddToShelves () {
    console.log({ isAuthenticated })
    if (isAuthenticated) {
      const isAdded = added
      setAdded(!isAdded)
      if (isAdded === false) openPopup()
    } else {
      navigate('/login')
    } 
  }

  // Función para añadir un libro a los leídos
  async function addBookToShelves({ userId, bookId, category, date_read }) {
    const response = await fetch('/api/user-books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: userId,
            book_id: bookId,
        })
    })
    if (response.ok) {
        console.log('Libro añadido a los leídos.');
    } else {
        console.error('Error al añadir el libro a los leídos.');
    }
}

  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const openPopup = () => setIsPopupOpen(true)
  const closePopup = () => setIsPopupOpen(false)

  return (
    <div className='individual-book-page'>
      <section className='individual-book-page-row'>
        <div className='individual-book-page-column'>
          <img className='cover' src={bookInList ? bookSearch[findedIndex].volumeInfo?.imageLinks?.smallThumbnail || defaultImageUrl : 'Loading cover...'} />
          <a className={`button ${added ? 'added' : ''}`} onClick={handleClickAddToShelves}>{added ? 'On shelves' : 'Add to shelves'}</a>
          {isPopupOpen && (
            <div className='popup-overlay'>
              <div className='popup-content'>
                <fieldset className=''>
                  <legend>Choose the shelves:</legend>
                  {categories.map((category) => {
                    return (
                        <div className='individual-book-page-row' key={category}>
                          <input type='checkbox' id={category} name={category} />
                          <label htmlFor={category}>{category}</label>
                        </div>
                    )
                  })}
                  <div className='individual-book-page-row'>
                    <p>+</p>
                    <p>Add new category</p>
                  </div>
                </fieldset>
                <button className='popup-button' onClick={closePopup}>Add</button>
              </div>
            </div>
          )}
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
