import './Header.css'
import bookLogo from '../../assets/logo-peekabook.png'
import { useAuth } from '../../context/AuthContext'
import { UserDropDown } from '../../components/UserDropDown/UserDropDown.jsx'
import { SearchForm } from '../../components/SearchForm/SearchForm.jsx'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import i18next from 'i18next'

export function Header() {
  const { userId, userEmail, isAuthenticated, logout } = useAuth()
  const [showMenu, setShowMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [langSelected, setLangSelected] = useState(() => i18next.language || 'en')

  const toggleMenu = () => setShowMenu((prev) => !prev)
  const toggleSearch = () => setShowSearch((prev) => !prev)

  function changeLang() {
    const newLang = langSelected === 'en' ? 'es' : 'en'
    i18next.changeLanguage(newLang, (err) => {
      if (err) {
        console.error('Error al cambiar idioma:', err)
      } else {
        console.log('Idioma cambiado a:', newLang)
        window.localStorage.setItem('langSelected', newLang)
        setLangSelected(newLang)
        window.location.reload()
      }
    })
  }

  return (
    <header className="header">
      <div className="container">
        <Link to="/"><img src={bookLogo} alt="Company Logo" className="logo"/></Link>

        <button className="menu-toggle" onClick={toggleMenu}>
            ☰
        </button>

        <nav className={`nav ${showMenu ? 'active' : ''}`}>
          <ul>
            <li>
              <Link className="nav-item" to="/" onClick={() => setShowMenu(false)}>
                {i18next.t('Home')}

              </Link>
            </li>
            <li>
              <Link
                className="nav-item"
                to={userId ? '/bookshelf/' + userId : '/login'}
                onClick={() => setShowMenu(false)}
              >
                {i18next.t('Bookshelf')}
              </Link>
            </li>
          </ul>
        </nav>

        <button className='search-toggle' onClick={toggleSearch} />

        <div className='form-container'>
          <SearchForm
            showSearch={showSearch}
          />
        </div>  

        <div className='dropdown-container'>
          <UserDropDown
            userEmail={userEmail}
            logout={logout}
            isAuthenticated={isAuthenticated}
          />
        </div>

        <div className='lang-container'>
          <button className={`lang-toggle ${i18next.t('Lang')}`} onClick={changeLang} />
        </div>
        
      </div>
    </header>
  )
}