import { useSignup } from '../../hooks/useSignup'

import './SignUpPage.css'

export function SignUpPage () {
  const { handleSubmit, message, error, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword } = useSignup()

  return (
    <div className='signup-page'>
      <div className='signup-container'>
        <h2 className='signup-h2'>「 Sign Up 」</h2>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form autoComplete='off' className='signup-form' onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete='false'
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete='new-password'
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className='signup-button' type='submit'>Sign Up</button>
        </form>
      </div>
      <p className='signup-p'>Do you already have an account? <a className='signup-a' href='/login'>Log in!</a></p>
    </div>
  )
}
