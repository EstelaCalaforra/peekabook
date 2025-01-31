import './HomePage.css'
import { useBestSellers } from '../../hooks/useBestSellers'
import { Quote } from '../../components/Quote/Quote.jsx'
import { BestsellersShelf } from '../../components/BestsellersShelf/BestsellersShelf.jsx'
import { ReviewsCarrousel } from '../../components/ReviewsCarrousel/ReviewsCarrousel.jsx'
import i18next from 'i18next'
import BookshelfIllustration from '../../assets/bookshelf.png'
import WritingIllustration from '../../assets/reading_2.png'
import CommunityIllustration from '../../assets/romantic.png'
import Rectangle from '../../assets/rectangle.png'

export function HomePage () {
  const { bestsellersData, loadingBestsellersData } = useBestSellers()

  return (
    <main className='homepage'>
      {
        loadingBestsellersData ?
          <p style={{backgroundColor: 'white', color: '#85644d', borderRadius: '5px', padding: '5px'}}>{i18next.t('Note that it takes around 30s to fully load due to server latence')}.</p>
          : null
      }
      <div className='homepage container'>
        <section className='quote'>
          <h3 className='title'>{i18next.t('Daily quote')}</h3>
          <div className='img-quote'>
            <img className='rectangle' src={Rectangle}></img>
            <Quote />
          </div>
        </section >
        <section  className='fill'>
          <div className='container'>
            <img className='illustration' src={BookshelfIllustration}></img>
            <div className='h3-desc-button'>
              <h3 className='title'>{i18next.t('Fill your bookshelf')}</h3>
              <div className='desc-button'>
                <p className='description'>{i18next.t('Discover the joy of building a library that reflects your passions, dreams, and curiosities. Whether you love timeless classics, thrilling mysteries, heartwarming tales, or practical guides, your library is your personal sanctuary of knowledge and imagination. Start curating your collection today and let every book you choose open a new world of possibilities.')}</p>
                <a href='/signup' className='button'>{i18next.t('Build your bookshelf')}</a>
              </div>
            </div>
          </div>
        </section >
        <section  className='reviews'>
          <div className='container'>
            <div className='h3-desc-button'>
              <h3 className='title'>{i18next.t('Write reviews')}</h3>
              <div className='desc-button'>
                <p className='description'>{i18next.t('Express your thoughts and connect with a community of readers by writing reviews for the books you love—or the ones that challenged you. Your insights can inspire others, spark conversations, and even help someone find their next favorite read. Start sharing your perspective and let your words make an impact!')}</p>
                <a href='/signup' className='button'>{i18next.t('Type a review')}</a>
              </div>
            </div>
            <img className='illustration' src={WritingIllustration}></img>
          </div>
        </section >
        <section  className='community'>
          <div className='container'>
            <img className='illustration' src={CommunityIllustration}></img>
            <div className='h3-desc-button'>
              <h3 className='title'>{i18next.t('Join our community')}</h3>
              <div className='desc-button'>
                <p className='description'>{i18next.t('Connect with fellow readers who share your passion for books. Exchange recommendations, discuss your favorite stories, and explore diverse perspectives. Our community is a place to celebrate the joy of reading, build friendships, and grow together through the power of words. Dive in and become part of the conversation!')}</p>
              </div>
            </div>
          </div>
          <ReviewsCarrousel />
        </section>
        <section  className='bestsellers'>
          <div className='container'>
            <div className='h3-desc-button'>
              <h3 className='title'>{i18next.t('Discover Bestsellers')}</h3>
              <div className='desc-button'>
                <p className='description'>{i18next.t('Stay in the loop with the latest chart-topping books that are captivating readers worldwide. From gripping novels to insightful nonfiction, explore the stories that are making waves. Whether you’re looking for your next page-turner or want to see what’s trending, the bestseller list is your guide to what’s hot in the literary world')}.</p>
                <BestsellersShelf
                  bestsellersData={bestsellersData}
                  loadingBestsellersData={loadingBestsellersData}
                /> 
              </div>
            </div>   
          </div>
        </section >
      </div>
    </main>
  )
}
