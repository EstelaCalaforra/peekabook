import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './CategoryPage.css'
import { useBookshelf } from '../../hooks/useBookshelf'
// import FiveStarsRatingIcon from '../../assets/five-stars-rating.png'

export function CategoryPage () {
  const location = useLocation()
  const category = location.state
  const { bookshelfData, hasBooks, handleClickOnCover, deleteBookFromBookshelf, categories, fetchBookshelfData } = useBookshelf()

  const defaultImageUrl = 'https://birkhauser.com/product-not-found.png'

  async function handleDeleteBook (book) {
    await deleteBookFromBookshelf(book)
  }

  useEffect(() => {
    fetchBookshelfData()
  }, [])

  return (
    <main className='category-page'>
      <h1>{category?.charAt(0).toUpperCase() + category?.slice(1)} Shelf</h1>
      {hasBooks && (
        <div className='row'>
          {bookshelfData
            .filter((book) => book.categories && book.categories.includes(category))
            .map((book) => (
              <li key={book.id_api} className='book'>
                <img className='cover' src={book?.cover || defaultImageUrl} alt='Book cover' />
                <div className='info'>
                  <div className='title-author'>
                    <h2>{book?.title || 'No title available'}</h2>
                    <p className='author'>
                      {book?.authors?.[0] || 'Unknown author.'}
                    </p>
                  </div>
                  <div className='read-more'>
                    <button
                      className='delete-icon'
                      onClick={() => handleDeleteBook(book)}
                    />
                    <a
                      onClick={() => handleClickOnCover(book?.id_api)}
                      className='button'
                    >
                      Read more
                    </a>
                  </div>
                </div>
              </li>
            ))}
        </div>
      )}
    </main>
  )
}
