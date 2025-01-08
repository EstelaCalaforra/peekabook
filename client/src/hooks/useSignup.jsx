import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const apiUrl = import.meta.env.VITE_API_URL;

export function useSignup () {
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

    const response = await fetch(apiUrl + '/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (data.success) {
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

  return { handleSubmit, message, error, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword }
}
