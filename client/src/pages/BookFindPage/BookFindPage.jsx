import './BookFindPage.css'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookSearchContext } from '../../context/bookSearchContext'
import FiveStarsRatingIcon from '../../assets/five-stars-rating.png'

const defaultImageUrl = 'https://birkhauser.com/product-not-found.png' // this img is not free use oopsie

export function BookFindPage () {
  const { bookSearch, setBookId } = useContext(BookSearchContext)
  const navigate = useNavigate()

  function handleClick (event, id) {
    event.preventDefault()
    setBookId(id)
    navigate('/ind-book/' + id)
  }

  useEffect(() => {
    async function addSearchToDB (bookSearch) {
      console.log({ bookSearch })
      const response = await fetch('http://localhost:5000/api/books/add-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookSearch }) // apis handle data in json format
      })
    }

    addSearchToDB(bookSearch)
  }, [bookSearch])

  return (
    <div className='bookfind-page'>
      <ul className='books-info'>
        <p className='results'>10 of 100 results</p>
        {bookSearch.map(book => (
          <li key={book.id} className='book'>
            <img className='bookinfo-cover' src={book.volumeInfo?.imageLinks?.smallThumbnail || defaultImageUrl} />
            <div className='bookinfo-info'>
              <div className='bookinfo-title-author'>
                <h2>{book.volumeInfo?.title || 'No title available'}</h2>
                <p className='bookfindpage-author'>
                  {book.volumeInfo?.authors?.[0] || 'Unknown author.'}
                </p>
                <img className='bookinfo-five-stars-icon' src={FiveStarsRatingIcon} />
                {/* <p className='bookfindpage-description'>
                  {book.volumeInfo?.description ? getFirst80Characters(book.volumeInfo?.description) : 'No description available.'}
                </p> */}
              </div>
              <a onClick={(event) => handleClick(event, book.id)} className='button'>Read more</a>
            </div>
          </li>
        ))}
        <hr/>
      </ul>
    </div>
  )
}
