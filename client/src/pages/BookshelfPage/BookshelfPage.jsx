import './BookshelfPage.css'
import Divider from '../../assets/botanical-divider-crop.png'
import { useBookshelf } from '../../hooks/useBookshelf'
import { Shelf } from '../../components/Shelf/Shelf.jsx'
import { ReviewCard } from '../../components/ReviewCard/ReviewCard.jsx'

export function BookshelfPage () {
  const {
    bookshelfData,
    hasBooks,
    hasReviews,
    handleClickOnCover,
    handleClickOnCategory,
    categories,
    reviews,
    deleteReviewFromDB,
    updateReviewInDB
  } = useBookshelf()

  const handleEditReview = async (updatedReview) => {
    await updateReviewInDB(updatedReview)
  }

  return (
    <div className='bookshelf-page'>
      {/* Shelves section */}
      <div className='books'>
        <h2>Bookshelves</h2>
        {/* <img src={Divider} className='bookshelf-divider' alt='divider' /> */}
        {hasBooks && (
          <div className='shelves'>
            {[...new Set(categories)].map((category) => {
              const booksInCategory = bookshelfData.filter((book) =>
                book.categories && book.categories.includes(category)
              )
              if (booksInCategory.length === 0) return null

              return (
                <Shelf
                  key={category}
                  category={category}
                  booksInCategory={booksInCategory}
                  handleClickOnCategory={handleClickOnCategory}
                  handleClickOnCover={handleClickOnCover}
                />
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

      {/* Reviews section */}
      <div className='reviews'>
        <h2>Recent reviews</h2>
        {/* <img src={Divider} className='bookshelf-divider' alt='divider' /> */}
        {hasReviews
          ? (
            <div className='reviews-and-button'>
              <ul className='reviews-container'>
                {reviews.slice(-6).map((review) => (
                  review.review && (
                    <ReviewCard
                      key={review.id_api}
                      review={review}
                      deleteReviewFromDB={deleteReviewFromDB}
                      handleEditReview={handleEditReview}
                    />
                  )
                ))}
              </ul>
              <a className='see-more'>See more</a>
            </div>
            )
          : (
            <div className='empty'>
              <p>You haven&apos;t reviewed any book yet. Write one!</p>
            </div>
            )}
      </div>
    </div>
  )
}
