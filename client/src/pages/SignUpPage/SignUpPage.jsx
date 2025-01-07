import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './SignUpPage.css'

export function SignUpPage () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const { setIsAuthenticated, setUserId, setAuthToken } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.')
      setTimeout(() => {
        setError('')
      }, 2000)

      return
    }

    const response = await fetch('http://localhost:5000/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (data.success) {
      console.log({ data })
      setMessage('Signup successful! Login and redirecting...')
      setUserId(data.userId)
      setAuthToken(data.token)
      setIsAuthenticated(true)
      setTimeout(() => {
        navigate('/bookshelf/' + data.userId)
      }, 2000)
    } else {
      setError(data.message || 'Signup failed')
    }
  }

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
