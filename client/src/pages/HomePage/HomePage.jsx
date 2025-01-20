import './HomePage.css'
import { useBestSellers } from '../../hooks/useBestSellers'
import { Quote } from '../../components/Quote/Quote.jsx'
import { BestsellersShelf } from '../../components/BestsellersShelf/BestsellersShelf.jsx'
import { ReviewsCarrousel } from '../../components/ReviewsCarrousel/ReviewsCarrousel.jsx'
import i18next from 'i18next'

export function HomePage () {
  const { bestsellersData, loadingBestsellersData } = useBestSellers()

  return (
    <main className='homepage'>
      <div className='homepage-container'>
        <section  className='quote-column'>
          <Quote />
        </section >
        <section  className='quote-column'>
          <p>Fill your bookshelf</p>
        </section >
        <section  className='quote-column'>
          <p>Write reviews</p>
        </section >
        <section  className='bestsellers bestsellers-container'>
          <h3 className='title'>{i18next.t('Weekly Bestsellers')}</h3>
          <BestsellersShelf
            bestsellersData={bestsellersData}
            loadingBestsellersData={loadingBestsellersData}
          />
        </section >

        <section  className='reviews-container'>
          <h3 className='title'>{i18next.t('Community')}</h3>
          <ReviewsCarrousel />
        </section >
      </div>
    </main>
  )
}
