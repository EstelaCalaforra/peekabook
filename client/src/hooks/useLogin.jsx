import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function useLogin () {
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth() // Accedemos al contexto de autenticación
  const navigate = useNavigate()

  // Handle the info submitted in the form
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()
      console.log({ data })

      if (data.success) {
        setMessage('Login successful! Redirecting...')
        setError('')
        const user = data.userId
        console.log({ user })

        // Llamamos al método login del contexto con el userId, userEmail y el token
        await login(data.userId, data.userEmail, data.token)

        setTimeout(() => {
          navigate('/bookshelf/' + data.userId) // Redirigimos a la página del usuario
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
