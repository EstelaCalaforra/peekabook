import './Header.css'
import bookLogo from '../../assets/other-logo.png'
import userIcon from '../../assets/user-icon.png'
import { useId, useContext, useState } from 'react'
import { BookSearchContext } from '../../context/bookSearchContext'
import { useAuth } from '../../context/AuthContext'
import { useBookSearch } from '../../hooks/useBookSearch'
import { UserPopup } from '../../components/UserPopup/UserPopup.jsx'

export function Header () {
  const { bookQuery } = useContext(BookSearchContext)
  const { handleSubmit, handleChange } = useBookSearch()
  const { userId, userEmail, isAuthenticated, logout } = useAuth()

  const searchBookFormId = useId()
  const searchBookInputId = useId()

  const [showPopup, setShowPopup] = useState(false) // Estado para manejar la visibilidad del popup

  // Manejar cuando el mouse entra en la zona del dropdown (username + popup)
  const handleMouseEnter = () => {
    setShowPopup(true)
  }

  // Manejar cuando el mouse sale de la zona del dropdown
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
            <div
              className='dropdown'
              onMouseEnter={handleMouseEnter} // Activamos el popup cuando el mouse entra en el contenedor
              onMouseLeave={handleMouseLeave} // Desactivamos el popup cuando el mouse sale de todo el contenedor
            >
              <div className='username'>{userEmail?.split('@')[0] || 'useremail'} ▼</div>
              {showPopup && (
                <UserPopup
                  logout={logout}
                  isAuthenticated={isAuthenticated}
                />
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
          <img src={userIcon} alt='User Icon' className='user-icon' />
        </div>
      </div>
    </header>
  )
}
