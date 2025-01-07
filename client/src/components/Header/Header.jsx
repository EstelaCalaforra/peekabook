import './Header.css'
import bookLogo from '../../assets/logo-peekabook.png'
import { useAuth } from '../../context/AuthContext'
import { UserDropDown } from '../../components/UserDropDown/UserDropDown.jsx'
import { SearchForm } from '../../components/SearchForm/SearchForm.jsx'
import { Link } from 'react-router-dom'

export function Header () {
  const { userId, userEmail, isAuthenticated, logout } = useAuth()

  return (
    <header className='header'>
      <div className='container'>
        <div className='row'>
          <img src={bookLogo} alt='Company Logo' className='logo' />
          <nav className='nav'>
            <ul>
              <li><Link className='nav-item' to='/'>Home</Link></li>
              <li><Link className='nav-item' to={userId ? '/bookshelf/' + userId : '/login'}>Bookshelf</Link></li>
            </ul>
          </nav>
        </div>
        <div className='searchbar-user row'>
          <SearchForm />
          <UserDropDown
            userEmail={userEmail}
            logout={logout}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </div>
    </header>
  )
}
