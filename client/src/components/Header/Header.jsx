import './Header.css';
import bookLogo from '../../assets/logo-peekabook.png';
import { useAuth } from '../../context/AuthContext';
import { UserDropDown } from '../../components/UserDropDown/UserDropDown.jsx';
import { SearchForm } from '../../components/SearchForm/SearchForm.jsx';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Header() {
  const { userId, userEmail, isAuthenticated, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const toggleMenu = () => setShowMenu((prev) => !prev);
  const toggleSearch = () => setShowSearch((prev) => !prev);

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <img src={bookLogo} alt="Company Logo" className="logo" />

          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>

          <nav className={`nav ${showMenu ? 'active' : ''}`}>
            <ul>
              <li>
                <Link className="nav-item" to="/" onClick={() => setShowMenu(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="nav-item"
                  to={userId ? '/bookshelf/' + userId : '/login'}
                  onClick={() => setShowMenu(false)}
                >
                  Bookshelf
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className='searchbar-user'>
          <button className='search-toggle' onClick={toggleSearch} />

          <div className='form-container'>
            <SearchForm
              showSearch={showSearch}
            />
          </div>  

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