import React, { useEffect } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './ReviewsCarrousel.css'
import Slider from 'react-slick'
import { useReview } from '../../hooks/useReview'
import FiveStarsRatingIcon from '../../assets/five-stars-rating.png'

export function ReviewsCarrousel () {
  const { allReviews, getAllReviewsFromDB } = useReview()

  useEffect(() => {
    getAllReviewsFromDB()
  }, [])

  if (allReviews.length === 0) {
    return (
      <div className='loading-container'>
        <p className='loading'>Loading reviews...</p>
      </div>
    )
  }

  // Configuración de React Slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 6000,
    autoplay: true,
    autoplaySpeed: 1,
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  // Duplica las reseñas para lograr un efecto infinito
  const reviewsDuplicated = [...allReviews, ...allReviews]

  return (
    <div className='review-carousel'>
      <Slider {...settings}>
        {allReviews.map((review, index) => (
          <div key={`${review.id || index}-${index}`} className='review-card'>
            <p>
              <strong>{review.user_email.split('@')[0]}</strong> on{' '}
              {review.date.split('T')[0]} reviewed:
            </p>
            <h4>{review.book_title}</h4>
            <img className='rating' src={FiveStarsRatingIcon} alt='rating' />
            <p>{review.review}</p>
          </div>
        ))}
      </Slider>
    </div>
  )
}
