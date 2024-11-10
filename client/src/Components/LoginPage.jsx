import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './styles/LoginPage.css'

export function LoginPage () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const { isAuthenticated, setIsAuthenticated, userId, setUserId, login } = useAuth()
  console.log({ isAuthenticated })
  // handle the info submitted in the form
  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }) // apis handle data in json format
    })

    const data = await response.json()
    console.log(data)

    if (data.success) {
      setMessage('Login successful! Redirecting...')
      setError('')
      await login(data.userId) // Llama a login en vez de setIsAuthenticated
      const isAuthenticatedFromLocalStorage = localStorage.getItem('isAuthenticated')
      console.log({ isAuthenticatedFromLocalStorage })
      setTimeout(() => {
        navigate('/bookshelf/' + data.userId)
      }, 2000)
    } else {
      setMessage('')
      setError(data.message || 'Login failed. Please try again.')
    }
  }

  return (
    <div className='login-page'>
      <div className='login-container'>
        <h2 className='login-h2'>⋆ ˚｡⋆ Login ⋆ ˚｡⋆</h2>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit} className='login-form'>
          <div>
            <label>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className='login-button' type='submit'>Login</button>
        </form>
      </div>
      <p className='login-p'>Don&apos;t have an account yet? <a className='login-a' href='/signup'>Sign up!</a></p>
    </div>
  )
}
