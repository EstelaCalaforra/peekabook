import { useState } from 'react'
import { Link } from 'react-router-dom'
import i18next from 'i18next'

export function UserDropDown ({ userEmail, logout, isAuthenticated }) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  const toggleMenu = () => setShowUserMenu((prev) => !prev)

  return (
    <>
      {isAuthenticated &&
        <div>
          <div className='username' onClick={toggleMenu}>{userEmail?.split('@')[0] || 'useremail'} ▼</div>
          {showUserMenu &&
            <div className='popup-login'>
              <div className='column'>
                <a onClick={logout}>{i18next.t('Log out')}</a>
              </div>
            </div>}
        </div>}
      {
        !isAuthenticated &&
          <div className='login-signup'>
            <Link className='button login' to='/login'>{i18next.t('Login')}</Link>
            <Link className='button signup' to='/signup'>{i18next.t('Signup')}</Link>
          </div>
      }
    </>
  )
}
