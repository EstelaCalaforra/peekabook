import { useState } from 'react'
import { Link } from 'react-router-dom'

export function UserDropDown ({ userEmail, logout, isAuthenticated }) {
  const [showDropDown, setShowDropDown] = useState(false)

  const handleMouseEnter = () => {
    setShowDropDown(true)
  }

  const handleMouseLeave = () => {
    setShowDropDown(false)
  }

  return (
    <>
      {isAuthenticated &&
        <div>
          <div className='username' onMouseEnter={handleMouseEnter}>{userEmail?.split('@')[0] || 'useremail'} ▼</div>
          {showDropDown &&
            <div className='popup-login'>
              <div className='column' onMouseLeave={handleMouseLeave}>
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
