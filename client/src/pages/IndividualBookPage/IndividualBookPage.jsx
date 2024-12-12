import './IndividualBookPage.css'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { BookSearchContext } from '../../context/bookSearchContext'
import Divider from '../../assets/botanical-divider-crop.png'
import { useAuth } from '../../context/AuthContext'
import { useBookshelf } from '../../hooks/useBookshelf'
import { useBook } from '../../hooks/useBook'
import { useReview } from '../../hooks/useReview'
import FiveStarsRatingIcon from '../../assets/five-stars-rating.png'
import { useBookSearch } from '../../hooks/useBookSearch'
const defaultImageUrl = 'https://birkhauser.com/product-not-found.png' // this img is not free use oopsie

export function IndividualBookPage () {
  const { bookSearch, setBookId, setCategories } = useContext(BookSearchContext)
  const { isAuthenticated, userId, authToken } = useAuth()
  const { categories, handleClickOnCover } = useBookshelf()
  const { book, getBookFromDB, booksBySameAuthor, getBooksBySameAuthor } = useBook()
  const { allReviews, getReviewsFromDB } = useReview()
  const [added, setAdded] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const idApi = location.idApi
  console.log({ bookSearch })
  console.log({ bookSearch })

  useEffect(() => {
    getBookFromDB()
    getReviewsFromDB()
  }, [])

  useEffect(() => {
    getBooksBySameAuthor(book?.authors?.[0])
    console.log({ booksBySameAuthor })
  }, [book])

  // useEffect(() => {
  //   async function addSearchToDB (booksBySameAuthor) {
  //     console.log({ booksBySameAuthor })
  //     const response = await fetch('http://localhost:5000/api/books/add-search', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ bookSearch: booksBySameAuthor }) // apis handle data in json format
  //     })
  //   }

  //   addSearchToDB(booksBySameAuthor)
  // }, [booksBySameAuthor])

  function handleClick (event, id) {
    // event.preventDefault()
    console.log({ id })
    setBookId(id)
    navigate('/ind-book/' + id)
  }

  async function handleAdd (event) {
    event.preventDefault()
    console.log('Checkboxes selected:', categoriesSelected)
    const bookAdded = {
      id: book.id_api,
      title: book.title,
      reviewText: review,
      categories: categoriesSelected,
      readDate: new Date()
    }
    await fetch('http://localhost:5000/api/books/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({ userId, bookAdded }) // apis handle data in json format
    })
    const isAdded = added
    setAdded(!isAdded)
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
    setNewCategory('')
  }

  function handleClickAddToShelves () {
    if (isAuthenticated) {
      const isAdded = added
      if (isAdded === false) openPopup()
    } else {
      navigate('/login')
    }
  }

  const [review, setReview] = useState('')
  function handleReviewChange (event) {
    const { value } = event.target
    console.log({ value })
    setReview(value)
    console.log({ review })
  }

  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const openPopup = () => setIsPopupOpen(true)
  const closePopup = () => setIsPopupOpen(false)

  return (
    <div className='individual-book-page'>
      <section className='individual-book-page-row'>
        <div className='individual-book-page-column'>
          <img className='cover' src={book?.cover || defaultImageUrl} alt={book?.title || 'No title available'} />
          <a className={`button ${added ? 'added' : ''}`} onClick={handleClickAddToShelves}>{added ? 'On shelves' : 'Add to shelves'}</a>
          {isPopupOpen && (
            <div className='popup-overlay'>
              <div className='close-button-and-popup'>
                <button className='popup-button' onClick={closePopup}>✖</button>
                <div className='popup-content'>
                  <form action={'http://localhost:5000/api/add-books/user/' + userId} method='post' onSubmit={handleAdd}>
                    <fieldset className=''>
                      <legend>Choose the shelves</legend>
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
                        <button className='' onClick={handleAddNewCategory}>+</button>
                      </div>
                    </fieldset>
                    <div className='individual-book-page-review'>
                      <label htmlFor='review'>Write a review</label>
                      <textarea id='review' name='review' value={review} onChange={handleReviewChange} rows='10' cols='50' placeholder='' />
                    </div>
                    <input type='submit' value='Add book' />
                  </form>
                </div>
              </div>
            </div>
          )}
          <a className='button buy' src=''>Buy</a>
        </div>
        <div className='individual-book-page-column'>
          <h1>{book?.title || 'No title available'}</h1>
          <h2>by {book?.authors?.[0] || 'Unknown author'}</h2>
          <img className='divider' src={Divider} />
          <p>{book?.description || 'No description available.'}</p>
        </div>
      </section>
      <section className='reviews'>
        <h2>Reviews</h2>
        <div className='individual-book-page-row'>
          {(allReviews.length > 0)
            ? (allReviews)?.map(review => (
              <li key={review.id} className='review'>
                <p className='username'>{review.email.split('@')[0]}</p>
                <img className='five-stars-icon' src={FiveStarsRatingIcon} />
                <p className='review-text'>{review.review}</p>
              </li>
              ))
            : <p>No reviews.</p>}
        </div>
      </section>
      <section className='similar-books'>
        <h2>Other books by {book?.authors?.[0]}</h2>
        <div className='individual-book-page-row'>
          {booksBySameAuthor
            ? (booksBySameAuthor).map(book => (
              <li key={book.id} className='book'>
                <a onClick={(event) => handleClick(event, book.id)}><img className='cover' src={book?.volumeInfo?.imageLinks?.smallThumbnail || defaultImageUrl} /></a>
              </li>
              ))
            : <p>Loading...</p>}
        </div>
      </section>
    </div>
  )
}
