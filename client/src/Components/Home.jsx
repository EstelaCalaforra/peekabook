import Button from '@mui/material/Button'
import './styles/Home.css'
import Shelf from '../assets/shelf.png'
import { useBestSellers } from '../hooks/useBestSellers'
import { Quote } from './Quote'

export function Home () {
  const { bestsellersData, loadingBestsellersData } = useBestSellers()

  return (
    <div>
      <div className='front container'>
        <div className='column'>
          <Quote />
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
        </div>
        <div className='column center'>
          <Button variant='contained'>START YOUR LIBRARY</Button>
          <p className='sign-in'>Already a member? <a>Sign in</a></p>
        </div>

      </div>

    </div>
  )
}
