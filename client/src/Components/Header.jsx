import './styles/Header.css'
import bookLogo from '../assets/other-logo.png'
import { useId, useContext } from 'react'
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

  return (
    <header>

      <img src={bookLogo} alt='Company Logo' className='logo' />
      <nav>
        <ul>
          <li><a href='/'>Home</a></li>
          <li><a href='/bookshelf'>Bookshelf</a></li>
        </ul>
      </nav>

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
    </header>
  )
}
