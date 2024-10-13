import './styles/Header.css'
import bookLogo from '../assets/other-logo.png'
import userIcon from '../assets/user-icon.png'
import { useId, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookSearchContext } from '../context/bookSearchContext'
import { useBookSearch } from '../hooks/useBookSearch'

export function Header () {
  const { bookQuery, setBookQuery } = useContext(BookSearchContext)
  const { setBooksGoogleAPI } = useBookSearch()

  // const dropdownSearchId = useId()
  const searchBookFormId = useId()
  const searchBookInputId = useId()

  const navigate = useNavigate()

  function handleSubmit (event) {
    event.preventDefault()
    setBooksGoogleAPI(bookQuery)
    navigate('/book-search')
  }

  function handleChange (event) {
    const newBookQuery = event.target.value
    setBookQuery(newBookQuery)
  }

  const [showPopup, setShowPopup] = useState(false)

  // Función para manejar el mouse sobre el logo
  const handleMouseEnter = () => {
    setShowPopup(true)
  }

  // Función para manejar cuando el mouse sale del logo
  const handleMouseLeave = () => {
    setShowPopup(false)
  }

  return (
    <header>
      <div className='row'>
        <img src={bookLogo} alt='Company Logo' className='logo' />
        <nav>
          <ul>
            <li><a href='/'>Home</a></li>
            <li><a href='/bookshelf'>Bookshelf</a></li>
          </ul>
        </nav>
      </div>
      <form id={searchBookFormId} onSubmit={handleSubmit} className='header-form'>
        <input id={searchBookInputId} type='text' onChange={handleChange} value={bookQuery} placeholder='Search book...' />
        {/* <div id={dropdownSearchId} className='dropdown-content'>
          {loading
            ? (
              <p>Loading...</p>
              )
            : (
              <ul>
                {responseBooks.map((result) => (
                  <li key={result.id}>
                    <h3>{result.volumeInfo.title}</h3>
                    <p>{result.volumeInfo.authors[0]}</p>
                  </li>
                ))}
              </ul>
              )}
        </div> */}
      </form>
      <div className=''>
        <img src={userIcon} alt='Company Logo' onMouseEnter={handleMouseEnter} className='user-icon' />
        {showPopup && (
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='header-popup-login'>
            <a href='/login' className=''>Log in</a>
          </div>
        )}
      </div>

    </header>
  )
}
