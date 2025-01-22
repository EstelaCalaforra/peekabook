/* eslint-disable quotes */
import './BookshelfPage.css'
import { useBookshelf } from '../../hooks/useBookshelf'
import { Shelf } from '../../components/Shelf/Shelf.jsx'
import { ReviewCard } from '../../components/ReviewCard/ReviewCard.jsx'
import { useEffect, useState } from 'react'
import i18next from 'i18next'

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

  const [activeView, setActiveView] = useState('bookshelves')

  return (
    <div className='bookshelf-page'>

      <div className='view-toggle'>
        <select
          id='view-select'
          onChange={(e) => setActiveView(e.target.value)}
          value={activeView}
          className='view-select'
        >
          <option value='bookshelves'>{i18next.t('Bookshelves')}</option>
          <option value='reviews'>{i18next.t('Recent Reviews')}</option>
        </select>
      </div>

      {/* Shelves section */}
      <div className={`bookshelves ${activeView  === 'bookshelves' ? 'active' : ''}`}>
        <h2>{i18next.t('Bookshelves')}</h2>
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
          </>
        )}
        {!hasBooks && (
          <div className='empty'>
            <p>{i18next.t("You haven't added any books yet. Search for one!")}</p>
          </div>
        )}
      </div>

      {/* Reviews section */}
      <div className={`reviews ${activeView  === 'reviews' ? 'active' : ''}`}>
        <h2 className='recent-reviews'>{i18next.t('Recent reviews')}</h2>
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
            </div>
          )
          : (
            <div className='empty'>
              <p>{i18next.t("You haven't reviewed any book yet. Write one")}!</p>
            </div>
          )}
      </div>
    </div>
  )
}