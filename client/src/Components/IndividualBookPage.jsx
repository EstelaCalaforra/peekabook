import './styles/IndividualBookPage.css'
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookSearchContext } from '../context/bookSearchContext'
import { useBookSearch } from '../hooks/useBookSearch'
import Divider from '../assets/botanical-divider-crop.png'
import { useAuth } from '../context/AuthContext'

const defaultImageUrl = 'https://birkhauser.com/product-not-found.png' // this img is not free use oopsie

export function IndividualBookPage () {
  const { bookSearch, bookId, setBookId, categories } = useContext(BookSearchContext)
  const { isAuthenticated, userId } = useAuth()
  const [categoriesSelected, setCategoriesSelected] = useState([])
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const { findedIndex } = useBookSearch()
  const bookInList = typeof findedIndex === 'number'

  const navigate = useNavigate()

  function handleClick (event, id) {
    event.preventDefault()
    console.log('bookId in BookFindPage', id)
    setBookId(id)
    navigate('/ind-book')
  }

  async function handleAdd (event) {
    event.preventDefault()
    console.log('Checkboxes selected:', categoriesSelected)

    const response = await fetch('/api/add-books/user' + userId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, bookId, readDate: new Date(), review: '', categoriesSelected }) // apis handle data in json format
    })

    const data = await response.json()
    console.log(data)

    if (data.success) { // there's a field in the json response called success (true or false)
      setMessage('Added successful! Redirecting...')
      setError('')
      setTimeout(() => { navigate('/bookshelf/' + data.userId) }, 2000)
    } else {
      setMessage('Something wrong happened.')
      setError(data.message || 'Please try again.') // there's a field in the json response called message
    }
  }

  function handleChange (event) {
    const { value, checked } = event.target

    if (checked) {
      setCategoriesSelected([...categoriesSelected, value])
    } else {
      setCategoriesSelected(categoriesSelected.filter(opcion => opcion !== value))
    }
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

  const node = useRef()
  function handleClickOutsideClick (event) {
    if (node && node.current && !node.current.contains(event.target)) {
      console.log('Clicked outside.')
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideClick)

    return () => document.removeEventListener('click', handleClickOutsideClick)
  }, [])

  // Función para añadir un libro a los leídos
  async function addBookToShelves ({ userId, bookId, category, date_read }) {
    const response = await fetch('/api/user-books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        book_id: bookId
      })
    })
    if (response.ok) {
      console.log('Libro añadido a los leídos.')
    } else {
      console.error('Error al añadir el libro a los leídos.')
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
                <form action='' method='post' onSubmit={handleAdd}>
                  {/* trying to make the popup close when clicking outside */}
                  <fieldset className='' ref={node}>
                    <legend>Choose the shelves:</legend>
                    {categories.map((category, key) => {
                      return (
                        <div className='individual-book-page-row' key={key}>
                          <input
                            type='checkbox'
                            id={category}
                            name={category}
                            value={category}
                            checked={categoriesSelected.includes(category)}
                            onChange={handleChange}
                          />
                          <label htmlFor={category}>{category}</label>
                        </div>
                      )
                    })}
                    <div className='individual-book-page-row'>
                      <p>+</p>
                      <p>Add new category</p>
                    </div>
                  </fieldset>
                  <input type='submit' value='Add' />
                  <button className='popup-button' onClick={closePopup}>Close</button>
                </form>
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
