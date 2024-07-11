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
    const fetchData = async () => {
      try {
        console.log("hola2");
        const response = await axios.get('http://localhost:5000/api');
        console.log(response);
        console.log(response.data);
        console.log(" Length: ", response.data.length);
        setBackendData(response.data);
        console.log("backendData: ", backendData)
        console.log(typeof(backendData));
        console.log(typeof [{}]);
      } catch (error) {
        console.log(error);
      }
    };
  
    console.log("hola1");
    fetchData();
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
              <p>El misterio de la vida no es un problema a resolver, sino una realidad a experimentar.</p>
              <p>Dune, Frank Herbert</p>
            </div>
          </div>
          <div className='front-buttons'>
            <Button variant="contained">See library</Button>
            <Button variant="contained">Add new book</Button>
          </div>
        </div>
    </div>
  )
}

export default Home;
