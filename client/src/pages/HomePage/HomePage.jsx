import './styles/HomePage.css'
import Shelf from '../assets/shelf.png'
import Divider from '../assets/botanical-divider-crop.png'
import { useBestSellers } from '../hooks/useBestSellers'
import { Quote } from './Quote'

export function HomePage () {
  const { bestsellersData, loadingBestsellersData } = useBestSellers()

  return (
    <div className='homepage'>
      <div className='column'>
        <Quote />
      </div>
      <div className='bestsellers column'>
        <h3 className='title'>Weekly Bestsellers</h3>
        <div className='column'>
          <div className='row'>
            {loadingBestsellersData
              ? (
                <p>Loading bestsellers...</p>
                )
              : (
                  bestsellersData.map((bookInfo, index) => (
                    <div className='column bestsellers-shelf' key={index}>
                      <a href='amazon.com'><img className='miniature' src={bookInfo.book_image} /></a>
                    </div>
                  ))
                )}
          </div>
          <img src={Shelf} className='home-shelf' />
        </div>
      </div>
      <div className='column center'>
        <a className='button' href='/signup'>START YOUR LIBRARY</a>
        <img className='divider' src={Divider} />
        <p>Already a member? <a className='login' href='/login'>Log in</a></p>
      </div>

    </div>

  )
}
