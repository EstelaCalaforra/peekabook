import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './styles/LoginPage.css' // Archivo de estilos

export function LoginPage () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const { isAuthenticated, setIsAuthenticated, setUserId } = useAuth()

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

    if (data.success) { // there's a field in the json response called success (true or false)
      setMessage('Login successful! Redirecting...')
      setUserId(data.userId)
      setError('')
      setIsAuthenticated(true)
      console.log({ isAuthenticated })
      setTimeout(() => { navigate('/bookshelf/' + data.userId) }, 2000)
    } else {
      setMessage('')
      setError(data.message || 'Login failed. Please try again.') // there's a field in the json response called message
    }
  }

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto', padding: '20px' }}>
      <h2>Login</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
