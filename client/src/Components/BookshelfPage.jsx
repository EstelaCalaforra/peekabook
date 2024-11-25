import './styles/BookshelfPage.css'
import Shelf from '../assets/shelf.png'
import RightArrow from '../assets/right-arrow.png'
import Divider from '../assets/botanical-divider-crop.png'
import { useBookshelf } from '../hooks/useBookshelf'
import FiveStarsRatingIcon from '../assets/five-stars-rating.png'
import EditIcon from '../assets/edit-icon.png'

export function BookshelfPage () {
  const { bookshelfData, hasBooks, hasReviews, handleClickOnCover, handleClickOnCategory, categories, reviews } = useBookshelf()
  console.log({ bookshelfData })
  return (
    <div className='bookshelf-page'>
      <div className='bookshelf-books'>
        <h3>Bookshelves</h3>
        <img src={Divider} className='bookshelf-divider' alt='divider' />
        {hasBooks && (
          <div className='bookshelf-shelves'>
            {[...new Set(categories)].map((category) => {
              // filter books that matches current category
              const booksInCategory = bookshelfData.filter((book) =>
                book.categories && book.categories.includes(category)
              )
              // no render if no books in category
              if (booksInCategory.length === 0) {
                return null
              }

              return (
                <div key={category} className='bookshelf-column-shelf'>
                  <a onClick={() => handleClickOnCategory({ category })}><h3>✿ {category}</h3></a>
                  {/* <img src={Divider} className='bookshelf-divider' alt='divider' /> */}
                  <div className='bookshelf-row'>
                    {booksInCategory.map((book) => (
                      <a key={book.id_api}>
                        <img
                          className='bookshelf-cover'
                          src={book.cover}
                          alt={book.title}
                          onClick={() => handleClickOnCover(book.id_api)}
                        />
                      </a>
                    ))}
                    <a onClick={() => handleClickOnCategory({ category })}><img src={RightArrow} className='bookshelf-arrow' alt='arrow' /></a>
                  </div>
                  <img src={Shelf} className='bookshelf-shelf' alt='shelf' />
                </div>
              )
            })}
          </div>
        )}
        {!hasBooks && (
          <div className='empty'>
            <p>You haven&apos;t added any books yet. Search for one!</p>
          </div>
        )}
      </div>

      <div className='bookshelf-reviews'>
        <h3>Recent reviews</h3>
        <img src={Divider} className='bookshelf-divider' alt='divider' />
        {hasReviews && (
          <ul className='reviews-container'>
            {reviews.map((review) => (
              <li className='review' key={review.id_api}>
                <p className='title'>{review.title}</p>
                <p className='authors'>by {review.authors}</p>
                <img className='five-stars-icon' src={FiveStarsRatingIcon} />
                <p className='review-text'>{review.review}</p>
                <button className='edit-icon' />
              </li>
            ))}
          </ul>
        )}
        {!hasReviews && (
          <div className='empty'>
            <p>You haven&apos;t reviewed any book yet. Write one!</p>
          </div>
        )}
      </div>
    </div>
  )
}
