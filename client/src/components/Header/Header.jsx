import './Header.css'
import bookLogo from '../../assets/logo-peekabook.png'
import userIcon from '../../assets/user-icon.png'
import { useAuth } from '../../context/AuthContext'
import { UserPopup } from '../../components/UserPopup/UserPopup.jsx'
import { SearchForm } from '../../components/SearchForm/SearchForm.jsx'

export function Header () {
  const { userId, userEmail, isAuthenticated, logout } = useAuth()

  return (
    <header className='header'>
      <div className='container'>
        <div className='row'>
          <img src={bookLogo} alt='Company Logo' className='logo' />
          <nav className='nav'>
            <ul>
              <li><a className='nav-item' href='/'>Home</a></li>
              <li><a className='nav-item' href={userId ? '/bookshelf/' + userId : '/login'}>Bookshelf</a></li>
            </ul>
          </nav>
        </div>
        <div className='searchbar-user row'>
          <SearchForm />
          <UserPopup
            userEmail={userEmail}
            logout={logout}
            isAuthenticated={isAuthenticated}
          />
          {/* <div className='column'>
          <img src={userIcon} alt='User Icon' className='user-icon' />
        </div> */}
        </div>
      </div>
    </header>
  )
}
