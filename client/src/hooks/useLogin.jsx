import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const apiUrl = import.meta.env.VITE_API_URL


export function useLogin () {
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  // Handle the info submitted in the form
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(apiUrl + '/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (data.success) {
        setMessage('Login successful! Redirecting...')
        setError('')

        await login(data.userId, data.userEmail, data.token)

        setTimeout(() => {
          console.log('useNavigate in useLogin')
          navigate('/bookshelf/' + data.userId)
        }, 2000)
      } else {
        setMessage('')
        setError(data.message || 'Login failed. Please try again.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setMessage('')
      setError('Something went wrong. Please try again later.')
    }
  }

  return { handleSubmit, error, setError, message, setMessage, setEmail, setPassword }
}
