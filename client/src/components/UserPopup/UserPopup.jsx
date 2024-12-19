import { useState } from 'react'

export function UserDropDown ({ userEmail, logout, isAuthenticated }) {
  const [showPopup, setShowPopup] = useState(false)

  const handleMouseEnter = () => {
    setShowPopup(true)
  }

  const handleMouseLeave = () => {
    setShowPopup(false)
  }

  return (
    <>
      {isAuthenticated &&
        <div>
          <div className='username' onMouseEnter={handleMouseEnter}>{userEmail?.split('@')[0] || 'useremail'} ▼</div>
          {showPopup &&
            <div className='popup-login'>
              <div className='column' onMouseLeave={handleMouseLeave}>
                <a onClick={logout}>Log out</a>
                <a className=''>Profile</a>
                <a className=''>Settings</a>
              </div>
            </div>}
        </div>}
      {
        !isAuthenticated &&
          <div className='row'>
            <a className='button login' href='/login'>Login</a>
            <a className='button signup' href='/signup'>Signup</a>
          </div>
      }
    </>
  )
}
