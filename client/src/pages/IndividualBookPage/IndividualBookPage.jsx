import './IndividualBookPage.css'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BookSearchContext } from '../../context/bookSearchContext'
import { useAuth } from '../../context/AuthContext'
import { useBookshelf } from '../../hooks/useBookshelf'
import { useBook } from '../../hooks/useBook'
import { useReview } from '../../hooks/useReview'
import { useIndividualBook } from '../../hooks/useIndividualBook'
import FiveStarsRatingIcon from '../../assets/five-stars-rating.png'
const defaultImageUrl = 'https://birkhauser.com/product-not-found.png' // this img is not free use oopsie

export function IndividualBookPage () {
  const { setBookId } = useContext(BookSearchContext)
  const { userId } = useAuth()
  const { categories, bookshelfData = [] } = useBookshelf()
  const { book, getBookFromDB, booksBySameAuthor, getBooksBySameAuthor } = useBook()
  const { allReviewsFromBook, getReviewsFromDB } = useReview()
  const [added, setAdded] = useState(false)
  const [isInBookshelf, setIsInBookshelf] = useState(false)
  const { id } = useParams()
  const {
    handleClick,
    handleAdd,
    handleChangeCategoriesSelected,
    handleChangeNewCategory,
    handleAddNewCategory,
    handleClickAddToShelves,
    handleReviewChange,
    isPopupOpen,
    closePopup,
    categoriesSelected,
    newCategory,
    review
  } = useIndividualBook()

  useEffect(() => {
    if (id) {
      console.log({ id })
      setBookId(id)
      getBookFromDB(id)
      getReviewsFromDB()
    }
  }, [id])

  // useEffect(() => {
  //   getBookFromDB()
  //   getReviewsFromDB()
  // }, [bookId])

  useEffect(() => {
    getBooksBySameAuthor(book?.authors?.[0])
  }, [book])

  useEffect(() => {
    async function addSearchToDB (booksBySameAuthor) {
      if (booksBySameAuthor) {
        await fetch('http://localhost:5000/api/books/add-search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ bookSearch: booksBySameAuthor })
        })
      }
    }
    addSearchToDB(booksBySameAuthor)
  }, [booksBySameAuthor])

  useEffect(() => {
    if (book && Array.isArray(bookshelfData)) {
      const bookExists = bookshelfData.some(item => item.id_api === book.id_api)
      setIsInBookshelf(bookExists)
      setAdded(bookExists)
    }
  }, [book, bookshelfData])

  return (
    <div className='individual-book-page'>
      <div className='container'>
        <section className='info-buttons'>
          <div className='cover-buttons'>
            <img className='cover' src={book?.cover || defaultImageUrl} alt={book?.title || 'No title available'} />
            <a className={`button ${added ? 'added' : ''}`} onClick={handleClickAddToShelves}>{isInBookshelf ? 'On bookshelf' : 'Add to bookshelf'}</a>
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
                            <div className='category' key={key}>
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
                        <div className='new-category'>
                          <input
                            placeholder='Add new category'
                            name='newCategory'
                            value={newCategory}
                            onChange={handleChangeNewCategory}
                          />
                          <button className='' onClick={handleAddNewCategory}>+</button>
                        </div>
                      </fieldset>
                      <div className='review'>
                        <label htmlFor='review'>Write a review</label>
                        <textarea id='review' name='review' value={review} onChange={handleReviewChange} rows='10' cols='50' placeholder='' />
                      </div>
                      <input className='add-button' type='submit' value={isInBookshelf ? 'Edit' : 'Add'} />
                    </form>
                  </div>
                </div>
              </div>
            )}
            {/* <a className='button buy' src=''>Buy</a> */}
          </div>
          <div className='title-author-desc'>
            <div className='title-author'>
              <h1>{book?.title || 'No title available'}</h1>
              <p>by {book?.authors?.[0] || 'Unknown author'}</p>
            </div>
            <p>{book?.description || 'No description available.'}</p>
          </div>
        </section>
        <section className='reviews-container'>
          <h2>Reviews</h2>
          <div className='reviews-row'>
            {(allReviewsFromBook.length > 0)
              ? (allReviewsFromBook)?.map(review => (
                <li key={review.id} className='review'>
                  <p className='date'>{review.date.split('T')[0]}</p>
                  <p className='username'>{review.email.split('@')[0]}</p>
                  <img className='five-stars-icon' src={FiveStarsRatingIcon} />
                  <p className='review-text'>{review.review}</p>
                </li>
                ))
              : <p>No reviews.</p>}
          </div>
        </section>
        <section className='other-books-container'>
          <h2>Other books by {book?.authors?.[0]}</h2>
          <div className='other-books'>
            {booksBySameAuthor
              ? (booksBySameAuthor).map(book => (
                <li key={book.id} className='book'>
                  <a onClick={() => handleClick(book.id)}><img className='cover' src={book?.volumeInfo?.imageLinks?.smallThumbnail || defaultImageUrl} /></a>
                </li>
                ))
              : <p>Loading...</p>}
          </div>
        </section>
      </div>
    </div>
  )
}
