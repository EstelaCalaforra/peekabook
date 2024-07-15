import { useState, useEffect } from 'react';
import './styles/App.css';
import axios from "axios";
import Button from '@mui/material/Button';
import bookPages from '../assets/book-pages.gif'
import './styles/Home.css';

function Home() {

  const [backendData, setBackendData] = useState([{}]);
   // fetch the backend API
   useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api');
        setBackendData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBackendData();
  }, []);

  const [quoteData, setQuoteData] = useState({quote: "", author: "", book: ""});
   // fetch the backend API
   useEffect(() => {
    const fetchQuoteData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-random-quote');
        setQuoteData({
          ...quoteData,
          quote: response.data.quote,
          author: response.data.author,
          book: response.data.book,
        });
        console.log(quoteData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuoteData();
  }, []);

  return (
    <div>
      {/* {(typeof backendData === 'undefined' || backendData.length === 0) ? (
          <p>Loading...</p>
        ) : (
          backendData.map((book, index) => (
            <p key={index}>{book.title}</p>
          ))
        )} */}
      <div className='front'>
          <img src={bookPages}></img>
          <div>
            <div className='quote'>
              <p>{quoteData.quote}</p>
              <p>{quoteData.author} &#40;{quoteData.book}&#41;</p>
            </div>
          </div>
          <div className='front-buttons'>
            <Button variant="contained">START YOUR LIBRARY</Button>
          </div>
          <div className='sign-in'>
              <p>¿Already a member?</p>
              <p><a>Sign in</a></p>
            </div>
        </div>
    </div>
  )
}

export default Home;
