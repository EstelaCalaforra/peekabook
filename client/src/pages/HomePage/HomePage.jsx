import './HomePage.css'
import { useBestSellers } from '../../hooks/useBestSellers'
import { Quote } from '../../components/Quote/Quote.jsx'
import { BestsellersShelf } from '../../components/BestsellersShelf/BestsellersShelf.jsx'
import { ReviewsCarrousel } from '../../components/ReviewsCarrousel/ReviewsCarrousel.jsx'
import i18next from 'i18next'

export function HomePage () {
  const { bestsellersData, loadingBestsellersData } = useBestSellers()

  return (
    <div className='homepage'>
      <div className='quote-bestsellers-container'>
        <div className='quote-column'>
          <Quote />
        </div>
        <div className='bestsellers bestsellers-container'>
          <h3 className='title'>{i18next.t('Weekly Bestsellers')}</h3>
          <BestsellersShelf
            bestsellersData={bestsellersData}
            loadingBestsellersData={loadingBestsellersData}
          />
        </div>
      </div>
      <div className='reviews-container'>
        <h3 className='title'>{i18next.t('Community')}</h3>
        <ReviewsCarrousel />
      </div>
    </div>
  )
}
