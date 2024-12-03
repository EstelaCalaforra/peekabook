import './Header.css'
import bookLogo from '../../assets/other-logo.png'
import userIcon from '../../assets/user-icon.png'
import { useId, useContext, useState } from 'react'
import { BookSearchContext } from '../../context/bookSearchContext'
import { useAuth } from '../../context/AuthContext'
import { useBookSearch } from '../../hooks/useBookSearch'

export function Header () {
  const { bookQuery } = useContext(BookSearchContext)
  const { handleSubmit, handleChange } = useBookSearch()
  const { userId, userEmail, isAuthenticated, logout } = useAuth()
  console.log({ userEmail })

  const searchBookFormId = useId()
  const searchBookInputId = useId()

  const [showPopup, setShowPopup] = useState(false)

  // Handle mouse click on username
  const handleClick = () => {
    setShowPopup(true)
  }

  // Handle mouse leave popup
  const handleMouseLeave = () => {
    setShowPopup(false)
  }

  return (
    <header className='header'>
      <div className='row'>
        <img src={bookLogo} alt='Company Logo' className='logo' />
        <nav>
          <ul>
            <li><a href='/'>Home</a></li>
            <li><a href={userId ? '/bookshelf/' + userId : '/login'}>Bookshelf</a></li>
          </ul>
        </nav>
      </div>
      <div className='searchbar-user row'>
        <form id={searchBookFormId} onSubmit={handleSubmit} className='header-form'>
          <input id={searchBookInputId} type='text' onChange={handleChange} value={bookQuery} placeholder='Search book...' />
        </form>
        {
              isAuthenticated &&
                <div onClick={handleClick} className='dropdown'>
                  <div className='username'>{userEmail?.split('@')[0] || 'useremail'} ▼</div>
                  {showPopup && (
                    <div onMouseEnter={handleClick} onMouseLeave={handleMouseLeave} className='header-popup-login'>
                      {
              isAuthenticated &&
                (
                  <div className='column'>
                    <a onClick={() => logout()}>Log out</a>
                    <a href='' className=''>Profile</a>
                    <a href='' className=''>Settings</a>
                  </div>
                )
                }
                    </div>
                  )}
                </div>
            }
        {
              !isAuthenticated &&
                <div className='row'>
                  <a className='button login' href='/login'>Login</a>
                  <a className='button signup' href='/signup'>Signup</a>
                </div>
            }
        <div className='column'>
          <img src={userIcon} alt='Company Logo' className='user-icon' />
        </div>
      </div>

    </header>
  )
}
