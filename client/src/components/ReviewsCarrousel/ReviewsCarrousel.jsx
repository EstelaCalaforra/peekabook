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

  // React Slick config
  const settings = {
    infinite: true,        
    slidesToShow: 4,       
    slidesToScroll: 1,     
    autoplay: true,        
    autoplaySpeed: 0,      
    speed: 5000,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          centerPadding: '50px' // Asegúrate de ajustar el padding según el tamaño de pantalla
        }
      },
      {
        breakpoint: 1390,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: '60px' // Ajusta el padding
        }
      },
      {
        breakpoint: 1090,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
          centerPadding: '20px' // Ajuste adicional para pantallas más pequeñas
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        }
      }
    ]
  }

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
