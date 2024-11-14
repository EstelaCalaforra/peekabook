import './styles/IndividualBookPage.css'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookSearchContext } from '../context/bookSearchContext'
import Divider from '../assets/botanical-divider-crop.png'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const defaultImageUrl = 'https://birkhauser.com/product-not-found.png' // this img is not free use oopsie

export function IndividualBookPage () {
  const { bookSearch, setBookId, bookId, categories, setCategories } = useContext(BookSearchContext)
  const { isAuthenticated, userId } = useAuth()
  const [book, setBook] = useState({})

  async function getBookFromDB () {
    try {
      const response = await axios.get('http://localhost:5000/api/get-book/' + bookId)
      const resDataGetBook = response.data[0]
      setBook(resDataGetBook)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getBookFromDB()
  }, [])

  const navigate = useNavigate()

  function handleClick (event, id) {
    event.preventDefault()
    setBookId(id)
    navigate('/ind-book/' + id)
  }

  async function handleAdd (event) {
    event.preventDefault()
    console.log('Checkboxes selected:', categoriesSelected)
    const bookAdded = {
      id: book.id_api,
      title: book.title,
      categories: categoriesSelected,
      readDate: new Date()
    }

    console.log({ book })

    // const response = await fetch('http://localhost:5000/api/add-books/user/' + userId, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ userId, bookAdded }) // apis handle data in json format
    // })
    const response = await fetch('http://localhost:5000/api/books/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, bookAdded }) // apis handle data in json format
    })
    closePopup()
  }

  const [categoriesSelected, setCategoriesSelected] = useState([])
  function handleChangeCategoriesSelected (event) {
    const { value, checked } = event.target
    console.log({ value })
    if (checked) {
      setCategoriesSelected([...categoriesSelected, value])
    } else {
      setCategoriesSelected(categoriesSelected.filter(option => option !== value))
    }
  }

  const [newCategory, setNewCategory] = useState('')
  function handleChangeNewCategory (event) {
    const { value } = event.target
    console.log({ value })
    setNewCategory(value)
  }
  function handleAddNewCategory (event) {
    event.preventDefault()
    setCategories((prevCategories) => ([...prevCategories, newCategory]))
    console.log(categories)
  }

  const [added, setAdded] = useState(false)
  function handleClickAddToShelves () {
    if (isAuthenticated) {
      const isAdded = added
      setAdded(!isAdded)
      if (isAdded === false) openPopup()
    } else {
      navigate('/login')
    }
  }

  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const openPopup = () => setIsPopupOpen(true)
  const closePopup = () => setIsPopupOpen(false)

  return (
    <div className='individual-book-page'>
      <section className='individual-book-page-row'>
        <div className='individual-book-page-column'>
          <img className='cover' src={book.cover || defaultImageUrl} alt={book.title || 'No title available'} />
          <a className={`button ${added ? 'added' : ''}`} onClick={handleClickAddToShelves}>{added ? 'On shelves' : 'Add to shelves'}</a>
          {isPopupOpen && (
            <div className='popup-overlay'>
              <div className='close-button-and-popup'>
                <button className='popup-button' onClick={closePopup}>✖</button>
                <div className='popup-content'>
                  <form action={'http://localhost:5000/api/add-books/user/' + userId} method='post' onSubmit={handleAdd}>
                    <fieldset className=''>
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
                              onChange={handleChangeCategoriesSelected}
                            />
                            <label htmlFor={category}>{category}</label>
                          </div>
                        )
                      })}
                      <div className='individual-book-page-row'>
                        <input
                          placeholder='Add new category'
                          name='newCategory'
                          value={newCategory}
                          onChange={handleChangeNewCategory}
                        />
                        <button className='' onClick={handleAddNewCategory}>➕</button>
                      </div>
                    </fieldset>
                    <input type='submit' value='Add book' />
                  </form>
                </div>
              </div>
            </div>
          )}
          <a className='button buy'>Buy on Amazon</a>
        </div>
        <div className='individual-book-page-column'>
          <h1>{book.title || 'No title available'}</h1>
          <h2>by {book.authors?.[0] || 'Unknown author'}</h2>
          <img className='divider' src={Divider} />
          <p>{book.description || 'No description available.'}</p>
        </div>
      </section>
      <section className='similar-books'>
        <h2>Books by same author</h2>
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
