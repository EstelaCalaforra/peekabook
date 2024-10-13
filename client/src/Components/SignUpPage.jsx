import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function SignUpPage () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (data.success) {
      setMessage('Signup successful! Please log in.')
      navigate('/bookshelf')
    } else {
      setError(data.message || 'Signup failed')
    }
  }

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto', padding: '20px' }}>
      <h2>Sign Up</h2>
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
        <div>
          <label>Confirm Password:</label>
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}
