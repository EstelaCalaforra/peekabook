import { useState, useEffect } from 'react';
import './styles/Bookshelf.css';
import axios from "axios";

function Bookshelf() {

    // fetch the get-bookshelf route (database)
  const [bookshelfData, setBookshelfData] = useState([{}])
  useEffect(() => {
    const fetchBookshelfData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-bookshelf')
        setBookshelfData(response.data)
        console.log(bookshelfData)
      } catch (error) {
        console.log(error)
      }
    };
    fetchBookshelfData()
  }, []);

  return (
    <>
    <h3>Your Bookshelf</h3>
        <div className='column'>
            {(typeof bookshelfData === 'undefined' || bookshelfData.length === 0) ? (
          <p>Loading...</p>
        ) : (
            bookshelfData.map((book) => (
            <p key={book.id}>{book.title}</p>
          ))
        )}
    </div>
    </>
  )
  
}

export default Bookshelf;
