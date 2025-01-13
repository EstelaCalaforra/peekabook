import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import './BestsellersShelf.css'
import i18next from 'i18next'

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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '70px',
    autoplay: true
  }

  return (
    <div className='bestsellers-row'>
      {loadingBestsellersData
        ? (
          <p>{i18next.t('Loading bestsellers')}...</p>
        )
        : isMobile
          ? (
            <Slider {...sliderSettings}>
              {bestsellersData.map((bookInfo, index) => (
                <div className='bestsellers-shelf' key={index}>
                  <img className='miniature' src={bookInfo.book_image} alt={bookInfo.title} />
                  <a className='button' href={bookInfo.buy_links[0].url}>{i18next.t('Buy')}</a>
                </div>
              ))}
            </Slider>
          )
          : (
            bestsellersData.map((bookInfo, index) => (
              <div className='bestsellers-shelf bestsellers-column' key={index}>
                <img className='miniature' src={bookInfo.book_image} alt={bookInfo.title} />
                <a className='button' href={bookInfo.buy_links[0].url}>Buy</a>
              </div>
            ))
          )}
    </div>
  )
}
