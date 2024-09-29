import { useState, useEffect } from 'react'
import './styles/BookshelfPage.css'
import axios from 'axios'
import Shelf from '../assets/shelf.png'
import RightArrow from '../assets/right-arrow.png'
import Divider from '../assets/botanical-divider-crop.png'

export function BookshelfPage () {
  // fetch the get-bookshelf route (database)
  const [bookshelfData, setBookshelfData] = useState([{}])
  useEffect(() => {
    const fetchBookshelfData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-bookshelf')
        setBookshelfData(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBookshelfData()
  }, [])

  return (
    <>
      <div className='bookshelf-shelves'>
        <div className='bookshelf-column'>
          <h3>Romance</h3>
          <img src={Divider} className='bookshelf-divider' />
          <div className='bookshelf-row'>
            {(typeof bookshelfData === 'undefined' || bookshelfData.length === 0)
              ? (
                <p>Loading...</p>
                )
              : (
                  bookshelfData.map((book) => (
                    book.tags === 'Romance' ? <img className='bookshelf-cover' key={book.id} src={book.img_path} /> : null
                  ))
                )}
            <img src={RightArrow} className='bookshelf-arrow' />
          </div>
          <img src={Shelf} className='bookshelf-shelf' />
        </div>
        <div className='bookshelf-column'>
          <h3>Nonfiction</h3>
          <img src={Divider} className='bookshelf-divider' />
          <div className='bookshelf-row'>
            {(typeof bookshelfData === 'undefined' || bookshelfData.length === 0)
              ? (
                <p>Loading...</p>
                )
              : (
                  bookshelfData.map((book) => (
                    book.tags === 'Nonfiction' ? <img className='bookshelf-cover' key={book.id} src={book.img_path} /> : null
                  ))
                )}
            <img src={RightArrow} className='bookshelf-arrow' />
          </div>
          <img src={Shelf} className='bookshelf-shelf' />
        </div>
        <div className='bookshelf-column'>
          <h3>Fantasy</h3>
          <img src={Divider} className='bookshelf-divider' />
          <div className='bookshelf-row'>
            {(typeof bookshelfData === 'undefined' || bookshelfData.length === 0)
              ? (
                <p>Loading...</p>
                )
              : (
                  bookshelfData.map((book) => (
                    book.tags === 'Fantasy' ? <img className='bookshelf-cover' key={book.id} src={book.img_path} /> : null
                  ))
                )}
            <img src={RightArrow} className='bookshelf-arrow' />
          </div>
          <img src={Shelf} className='bookshelf-shelf' />
        </div>
        <div className='bookshelf-column'>
          <h3>Sci-Fi</h3>
          <img src={Divider} className='bookshelf-divider' />
          <div className='bookshelf-row'>
            {(typeof bookshelfData === 'undefined' || bookshelfData.length === 0)
              ? (
                <p>Loading...</p>
                )
              : (
                  bookshelfData.map((book) => (
                    book.tags === 'Sci-Fi' ? <img className='bookshelf-cover' key={book.id} src={book.img_path} /> : null
                  ))
                )}
            <img src={RightArrow} className='bookshelf-arrow' />
          </div>
          <img src={Shelf} className='bookshelf-shelf' />
        </div>
        <div className='bookshelf-column'>
          <h3>Historical</h3>
          <img src={Divider} className='bookshelf-divider' />
          <div className='bookshelf-row'>
            {(typeof bookshelfData === 'undefined' || bookshelfData.length === 0)
              ? (
                <p>Loading...</p>
                )
              : (
                  bookshelfData.map((book) => (
                    book.tags === 'Historical' ? <img className='bookshelf-cover' key={book.id} src={book.img_path} /> : null
                  ))
                )}
            <img src={RightArrow} className='bookshelf-arrow' />
          </div>
          <img src={Shelf} className='bookshelf-shelf' />
        </div>
        <div className='bookshelf-column'>
          <div>
            <h3>Contemporary</h3>
            <img src={Divider} className='bookshelf-divider' />
          </div>
          <div className='bookshelf-row'>
            {(typeof bookshelfData === 'undefined' || bookshelfData.length === 0)
              ? (
                <p>Loading...</p>
                )
              : (
                  bookshelfData.map((book) => (
                    book.tags === 'Contemporary' ? <img className='bookshelf-cover' key={book.id} src={book.img_path} /> : null
                  ))
                )}
            <img src={RightArrow} className='bookshelf-arrow' />
          </div>
          <img src={Shelf} className='bookshelf-shelf' />
        </div>
      </div>
    </>
  )
}
