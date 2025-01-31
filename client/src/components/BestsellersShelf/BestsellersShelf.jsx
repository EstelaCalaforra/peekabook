import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import './BestsellersShelf.css'
import i18next from 'i18next'
import FiveStarsRatingIcon from '../../assets/five-stars-rating.png'

export function BestsellersShelf ({ bestsellersData, loadingBestsellersData }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const sliderSettings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '150px',
    slidesToShow: 3,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    dots: true,
    
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          centerPadding: '0px',
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          centerPadding: '0px',
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '0px',
        }
      }
    ]
  }

  return (
    <div className='p-carrousel'>
      {loadingBestsellersData
        ? (
          <p>{i18next.t('Loading bestsellers')}...</p>
        )
        : (
          <Slider {...sliderSettings}>
            {bestsellersData.map((bookInfo, index) => (
              <div className='bs-info' key={index}>
                <img className='miniature' src={bookInfo.book_image} alt={bookInfo.title} />
                <a className='button' href={bookInfo.buy_links[0].url} target='_blank'>{i18next.t('Buy')}</a>
              </div>
            ))}
          </Slider>
        )
      }
    </div>
  )
}
