import { useState } from 'react'
import { Link } from 'react-router-dom'

export function UserDropDown ({ userEmail, logout, isAuthenticated }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleMenu = () => setShowUserMenu((prev) => !prev);

  return (
    <>
      {isAuthenticated &&
        <div>
          <div className='username' onClick={toggleMenu}>{userEmail?.split('@')[0] || 'useremail'} ▼</div>
          {showUserMenu &&
            <div className='popup-login'>
              <div className='column'>
                <a onClick={logout}>Log out</a>
                {/* <a className=''>Profile</a> */}
                {/* <a className=''>Settings</a> */}
              </div>
            </div>}
        </div>}
      {
        !isAuthenticated &&
          <div className='login-signup'>
            <Link className='button login' to='/login'>Login</Link>
            <Link className='button signup' to='/signup'>Signup</Link>
          </div>
      }
    </>
  )
}
