import { useState, useEffect } from 'react'
import axios from "axios"
import Button from '@mui/material/Button'
// import bookPages from '../assets/book-pages.gif'
import './styles/Home.css'
// import MediaCard from './MediaCard'
import Divider from '../assets/waving-line-border-decoration-by-Vexels.png'
import Shelf from '../assets/shelf.png'


function Home() {

  // fetch the get-random-quote API
  const [quoteData, setQuoteData] = useState({quote: "", author: "", book: ""})
  useEffect(() => {
    const fetchQuoteData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-random-quote')
        setQuoteData(() => {
          const newQuoteData = quoteData
          return {
            ...newQuoteData,
          quote: response.data.quote,
          author: response.data.author,
          book: response.data.book
          }
        })
        console.log(quoteData)
      } catch (error) {
        console.log(error)
      }
    };
    fetchQuoteData();
  }, []);

  // fetch the get-bestsellers API
  const [bestsellersData, setBestsellersData] = useState([{}])
   
   useEffect(() => {
    const fetchBestsellersData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-bestsellers')
        setBestsellersData(response.data.results.lists[0].books)
      } catch (error) {
        console.log(error)
      }
    };
    fetchBestsellersData()
  }, [])

  return (
    <div>
      <div className='front container'>
        <div className='row'>
            <div className='quote column'>
              <h3 className='title'>Daily quote</h3>
              {/* <img className='miniature' src={bookPages}></img> */}
              <div>
                <p>{quoteData.quote}</p>
                <img src={Divider}></img>
                <p>{quoteData.author} &#40;{quoteData.book}&#41;</p>
              </div>
            </div>
            <div className='bestsellers column'>
              <h3 className='title'>Weekly Bestsellers</h3>
              <div className='row'>
                {(typeof bestsellersData === 'undefined' || bestsellersData.length === 0) ? (
                          <p>Loading...</p>
                        ) : (
                          bestsellersData.map((bookInfo, index) => (
                            <div className='column bestsellers-shelf' key={index}>
                              <a href='amazon.com'><img className="miniature" src={bookInfo.book_image}></img></a>
                              {/* <p>{bookInfo.title}</p> */}
                            </div>
                          ))
                        )}
                </div>
                <img src={Shelf} className='shelf'></img>
            </div>
          </div>
          <div className='row'>
            <div className='column center'>
              <Button variant="contained">START YOUR LIBRARY</Button>
              <p className='sign-in'>Already a member? <a>Sign in</a></p>
            </div>
            {/* <h3 className='quote'>Weekly Bestsellers</h3>
            <div className='row'>
              {(typeof bestsellersData === 'undefined' || bestsellersData.length === 0) ? (
                            <p>Loading...</p>
                          ) : (
                            bestsellersData.map((bookInfo, index) => (
                              <MediaCard key={index} imgPath={bookInfo.book_image} title={bookInfo.title}/>
                            ))
                          )}
                </div> */}
              </div>
          </div>
            
    </div>
  )
}

export default Home;
