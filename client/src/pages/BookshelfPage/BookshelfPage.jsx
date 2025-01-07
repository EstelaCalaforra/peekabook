import './BookshelfPage.css'
import { useBookshelf } from '../../hooks/useBookshelf'
import { Shelf } from '../../components/Shelf/Shelf.jsx'
import { ReviewCard } from '../../components/ReviewCard/ReviewCard.jsx'
import { useEffect } from 'react'

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
    updateReviewInDB,
    fetchBookshelfData
  } = useBookshelf()

  const handleEditReview = async (updatedReview) => {
    await updateReviewInDB(updatedReview)
  }

  useEffect(() => {
    fetchBookshelfData()
  }, [])

  return (
    <div className='bookshelf-page'>
      {/* Shelves section */}
      <div className='bookshelves'>
        <h2>Bookshelves</h2>
        {hasBooks && (
          <>
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
            {/* <a className='see-more'>See more</a> */}
          </>
        )}
        {!hasBooks && (
          <div className='empty'>
            <p>You haven&apos;t added any books yet. Search for one!</p>
          </div>
        )}
      </div>

      {/* Reviews section */}
      <div className='reviews'>
        <h2 className='recent-reviews'>Recent reviews</h2>
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
              {/* <a className='see-more'>See more</a> */}
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
