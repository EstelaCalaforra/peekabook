import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Crear contexto
export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [userId, setUserId] = useState(() => localStorage.getItem('userId') || '')
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('userEmail') || '')
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') || '')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Función para limpiar el estado del usuario
  const clearUserData = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('userEmail')

    setIsAuthenticated(false)
    setUserId('')
    setUserEmail('')
    setAuthToken('')
  }

  // Login function
  const login = async (userId, userEmail, token) => {
    setAuthToken(token)
    localStorage.setItem('authToken', token)
    localStorage.setItem('userId', userId)
    localStorage.setItem('userEmail', userEmail)

    setIsAuthenticated(true)
    setUserId(userId)
    setUserEmail(userEmail)
  }

  // Logout function
  const logout = async () => {
    clearUserData()
    navigate('/login') // Navegar a la página de login
  }

  // Verifica si el token es válido en todas las peticiones
  const verifyToken = async (token) => {
    console.log({ token })
    try {
      const response = await fetch('http://localhost:5000/api/users/verify-token', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json()

      // Si el token es inválido o expirado, se ejecuta el logout
      if (response.status === 403) {
        console.log('entrado en clearuserdata')
        clearUserData() // Limpiar los datos del usuario
        navigate('/login') // Redirigir al login
        return false
      }

      return true
    } catch (error) {
      console.error('Error al verificar el token:', error)
      clearUserData()
      navigate('/login')
      return false
    }
  }

  // Verificar token al cargar el contexto
  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if (token) {
      console.log('Token in useEffect', token)
      verifyToken(token).then((isValid) => {
        if (isValid) {
          console.log('Enter in isvalid')
          setIsAuthenticated(true)
          setUserId(localStorage.getItem('userId'))
          console.log(localStorage.getItem('userId'))
          setUserEmail(localStorage.getItem('userEmail'))
          console.log(localStorage.getItem('userEmail'))
        }
      })
    } else {
      clearUserData()
    }

    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authToken,
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

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext)
