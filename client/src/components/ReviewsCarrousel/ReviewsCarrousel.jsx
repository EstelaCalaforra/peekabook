import { useEffect, useState } from 'react';
import { useReview } from '../../hooks/useReview';
import './ReviewsCarrousel.css';
import FiveStarsRatingIcon from '../../assets/five-stars-rating.png';

export function ReviewsCarrousel() {
  const { allReviews, getAllReviewsFromDB } = useReview();

  // Cargar las reseñas al iniciar el componente
  useEffect(() => {
    getAllReviewsFromDB();
  }, [getAllReviewsFromDB]);

  if (allReviews.length === 0) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div className="review-carousel">
      <div className="reviews-group">
        {allReviews.map((review, index) => (
          <div key={review.id || index} className="review-card">
            <p>
              <strong>{review.user_email}</strong> on {review.date.split('T')[0]} reviewed:
            </p>
            <h4>{review.book_title}</h4>
            <img className="rating" src={FiveStarsRatingIcon} alt="rating" />
            <p>{review.review}</p>
          </div>
        ))}
        {allReviews.map((review, index) => (  // Repetir las reseñas para un efecto infinito
          <div key={`duplicate-${index}`} className="review-card">
            <p>
              <strong>{review.user_email}</strong> on {review.date.split('T')[0]} reviewed:
            </p>
            <h4>{review.book_title}</h4>
            <img className="rating" src={FiveStarsRatingIcon} alt="rating" />
            <p>{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
