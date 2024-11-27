import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Crete context
export const AuthContext = createContext()

// Context provider
export function AuthProvider ({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Login function
  const login = async (userId, userEmail, token) => {
    localStorage.setItem('authToken', token)
    localStorage.setItem('userId', userId)
    localStorage.setItem('userEmail', userEmail)

    setIsAuthenticated(true)
    setUserId(userId)
    setUserEmail(userEmail)
  }

  // Logout function
  const logout = async () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('userEmail')

    setIsAuthenticated(false)
    setUserId('')
    setUserEmail('')

    navigate('/login')
  }

  const validateToken = async () => {
    console.log('enter validate')
    const token = localStorage.getItem('authToken') // Obtener el token desde localStorage

    if (!token) {
      console.log('enter validate !token')
      setIsAuthenticated(false)
      setLoading(false)
      return
    }

    try {
      console.log('enter validate token exists')
      const response = await axios.get('/api/users/verify', {
        headers: { Authorization: `Bearer ${token}` }
      })

      const { user } = response.data
      console.log({ user })
      setIsAuthenticated(true)
      setUserId(user.id)
      setUserEmail(user.email)
    } catch (error) {
      console.error('Token validation failed:', error)
      logout() // Si el token no es válido, cerrar sesión
    } finally {
      setLoading(false)
    }
  }

  // Validar el token cuando se monta el proveedor
  useEffect(() => {
    validateToken()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        userId,
        userEmail,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
// Hook to use the context
export const useAuth = () => useContext(AuthContext)
