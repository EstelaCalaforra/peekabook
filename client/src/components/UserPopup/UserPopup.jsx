export function UserPopup ({ logout, isAuthenticated }) {
  return (
    <div className='popup-login'>
      {isAuthenticated && (
        <div className='column'>
          <a onClick={logout}>Log out</a>
          <a href='' className=''>Profile</a>
          <a href='' className=''>Settings</a>
        </div>
      )}
    </div>
  )
}
