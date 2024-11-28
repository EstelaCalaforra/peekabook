import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authToken } = useAuth()
  console.log({ isAuthenticated })
  console.log({ authToken })

  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      console.log({ isAuthenticated })
      // Redirige a la página de inicio de sesión
      navigate('/login')
    }
  }, [])

  return isAuthenticated ? children : null
}
