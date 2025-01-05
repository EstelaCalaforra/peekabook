import './HomePage.css'
import { useBestSellers } from '../../hooks/useBestSellers'
import { Quote } from '../../components/Quote/Quote.jsx'
import { BestsellersShelf } from '../../components/BestsellersShelf/BestsellersShelf.jsx'
import { ReviewsCarrousel } from '../../components/ReviewsCarrousel/ReviewsCarrousel.jsx'

export function HomePage () {
  const { bestsellersData, loadingBestsellersData } = useBestSellers()

  return (
    <div className='homepage'>
      <div className='quote-bestsellers-container'>
        <div className='quote-column'>
          <Quote />
        </div>
        <div className='bestsellers bestsellers-container'>
          <h3 className='title'>Weekly Bestsellers</h3>
          <BestsellersShelf
            bestsellersData={bestsellersData}
            loadingBestsellersData={loadingBestsellersData}
          />
        </div>
      </div>
      <div className='reviews-container'>
        <h3 className='title'>Community</h3>
        <ReviewsCarrousel />
      </div>
    </div>
  )
}
