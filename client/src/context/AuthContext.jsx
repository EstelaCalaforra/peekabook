import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Create context
export const AuthContext = createContext()

// Context provider
export function AuthProvider ({ children }) {
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem('userId') || ''
  })
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem('userEmail') || ''
  })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('authToken')
    return !!token
  })
  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem('authToken') || ''
  })

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
    localStorage.removeItem('authToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('userEmail')

    setIsAuthenticated(false)
    setUserId('')
    setUserEmail('')

    navigate('/login')
  }

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
// Hook to use the context
export const useAuth = () => useContext(AuthContext)
