import { useLocation } from 'react-router-dom'
import './CategoryPage.css'
import { useBookshelf } from '../../hooks/useBookshelf'
import FiveStarsRatingIcon from '../../assets/five-stars-rating.png'

const defaultImageUrl = 'https://birkhauser.com/product-not-found.png' // this img is not free use oopsie

export function CategoryPage () {
  const location = useLocation()
  const category = location.state
  const { bookshelfData, hasBooks, handleClickOnCover, categories } = useBookshelf()

  console.log({ categories })
  return (
    <main className='category-page'>
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Shelf</h1>
      {hasBooks && (
        <div className='row'>
          {/* Filtrar libros que pertenecen a la categoría actual */}
          {bookshelfData
            .filter((book) => book.categories && book.categories.includes(category))
            .map(book => (
              <li key={book.id} className='book'>
                <img className='cover' src={book?.cover || defaultImageUrl} />
                <div className='info'>
                  <div className='title-author'>
                    <h2>{book?.title || 'No title available'}</h2>
                    <p className='author'>
                      {book?.authors?.[0] || 'Unknown author.'}
                    </p>
                    <img className='five-stars-icon' src={FiveStarsRatingIcon} />
                    {/* <p className='bookfindpage-description'>
                      {book.volumeInfo?.description ? getFirst80Characters(book.volumeInfo?.description) : 'No description available.'}
                    </p> */}
                  </div>
                  <div className='read-more'>
                    <a onClick={() => handleClickOnCover(book.id_api)} className='button'>Read more</a>
                  </div>
                </div>
              </li>
            ))}
        </div>
      )}
    </main>
  )
}
