import './Header.css'
import bookLogo from '../../assets/other-logo.png'
import userIcon from '../../assets/user-icon.png'
import { useAuth } from '../../context/AuthContext'
import { UserPopup } from '../../components/UserPopup/UserPopup.jsx'
import { SearchForm } from '../../components/SearchForm/SearchForm.jsx'

export function Header () {
  const { userId, userEmail, isAuthenticated, logout } = useAuth()

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
        <SearchForm />
        <UserPopup
          userEmail={userEmail}
          logout={logout}
          isAuthenticated={isAuthenticated}
        />
        <div className='column'>
          <img src={userIcon} alt='User Icon' className='user-icon' />
        </div>
      </div>
    </header>
  )
}
