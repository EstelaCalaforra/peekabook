import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const apiUrl = import.meta.env.VITE_API_URL;

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [userId, setUserId] = useState(() => window.localStorage.getItem('userId') || '')
  const [userEmail, setUserEmail] = useState(() => window.localStorage.getItem('userEmail') || '')
  const [authToken, setAuthToken] = useState(() => window.localStorage.getItem('authToken') || '')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  // Function to clear user data when logout or session token expired
  const clearUserData = () => {
    window.localStorage.removeItem('authToken')
    window.localStorage.removeItem('userId')
    window.localStorage.removeItem('userEmail')

    setIsAuthenticated(false)
    setUserId('')
    setUserEmail('')
    setAuthToken('')
  }

  // Login function
  const login = async (userId, userEmail, token) => {
    setAuthToken(token)
    window.localStorage.setItem('authToken', token)
    window.localStorage.setItem('userId', userId)
    window.localStorage.setItem('userEmail', userEmail)

    setIsAuthenticated(true)
    setUserId(userId)
    setUserEmail(userEmail)
  }

  // Logout function
  const logout = async () => {
    clearUserData()
    navigate('/login')
  }

  // Verify if token valid in all petitions
  const verifyToken = async (token) => {
    try {
      const response = await fetch(apiUrl + '/api/users/verify-token', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // If token invalid or expired, logout
      if (response.status === 403) {
        if (location.pathname === '/') {
          return true
        }
        clearUserData()
        navigate('/login')
        return false
      }

      return true
    } catch (error) {
      console.error('Error verifying token:', error)
      clearUserData()
      navigate('/login')
      return false
    }
  }

  // Verify token when context mounted
  useEffect(() => {
    const token = window.localStorage.getItem('authToken')

    if (token) {
      verifyToken(token).then((isValid) => {
        if (isValid) {
          setIsAuthenticated(true)
          setUserId(window.localStorage.getItem('userId'))
          setUserEmail(window.localStorage.getItem('userEmail'))
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
        setIsAuthenticated,
        authToken,
        setAuthToken,
        login,
        logout,
        userId,
        setUserId,
        userEmail,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
