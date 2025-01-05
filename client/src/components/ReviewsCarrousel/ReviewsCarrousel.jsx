import { useEffect } from 'react'
import { useReview } from '../../hooks/useReview'
import './ReviewsCarrousel.css'
import FiveStarsRatingIcon from '../../assets/five-stars-rating.png'

export function ReviewsCarrousel () {
  const { allReviews, getAllReviewsFromDB } = useReview()

  useEffect(() => {
    getAllReviewsFromDB()
  }, [])

  if (allReviews.length === 0) {
    return <p>Loading reviews...</p>
  }

  // Duplicate reviews for infinite looping effect
  const reviewsDuplicated = [...allReviews, ...allReviews]

  return (
    <div className='review-carousel'>
      <div className='reviews-group'>
        {reviewsDuplicated.map((review, index) => (
          <div key={`${review.id || index}-${index}`} className='review-card'>
            <p>
              <strong>{review.user_email.split('@')[0]}</strong> on {review.date.split('T')[0]} reviewed:
            </p>
            <h4>{review.book_title}</h4>
            <img className='rating' src={FiveStarsRatingIcon} alt='rating' />
            <p>{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
