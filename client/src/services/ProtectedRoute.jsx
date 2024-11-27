import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      console.log({ isAuthenticated })
      // Redirige a la página de inicio de sesión
      navigate('/login')
    }
  }, [])

  // Renderiza los componentes hijos solo si está autenticado
  return isAuthenticated ? children : null
}
