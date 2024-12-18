import './HomePage.css'
import Shelf from '../../assets/shelf.png'
import LandingImg from '../../assets/bg-books-trans50-crop.png'
import Divider from '../../assets/botanical-divider-crop.png'
import { useBestSellers } from '../../hooks/useBestSellers'
import { Quote } from '../../components/Quote/Quote.jsx'
import { BestsellersShelf } from '../../components/BestsellersShelf/BestsellersShelf.jsx'

export function HomePage () {
  const { bestsellersData, loadingBestsellersData } = useBestSellers()

  return (
    <div className='homepage'>
      {/* <img className='landing-img' src={LandingImg} /> */}
      <div className='quote-column'>
        <Quote />
      </div>
      <div className='bestsellers bestsellers-container'>
        <h3 className='title'>Weekly Bestsellers</h3>
        <div className='bestsellers-column'>
          <BestsellersShelf
            bestsellersData={bestsellersData}
            loadingBestsellersData={loadingBestsellersData}
          />
          {/* <img src={Shelf} className='home-shelf' /> */}
        </div>
      </div>
      <div className='reviews reviews-container'>
        <h3 className='title'>Gossip what your friends are reading</h3>
      </div>
      {/* <div className='column center'>
        <a className='button' href='/signup'>START YOUR LIBRARY</a>
        <img className='divider' src={Divider} />
        <p>Already a member? <a className='login' href='/login'>Log in</a></p>
      </div> */}
    </div>
  )
}
