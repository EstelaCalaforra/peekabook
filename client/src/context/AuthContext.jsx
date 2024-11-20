import { createContext, useContext, useState } from 'react'

// Create the context
export const AuthContext = createContext()

// Context Provider
export function AuthProvider ({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem('isAuthenticated')) || false
  )
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '')
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '')
  // Función para iniciar sesión y almacenar en localStorage
  const login = async (userId, userEmail) => {
    setIsAuthenticated(true)
    setUserId(userId)
    setUserEmail(userEmail)
    localStorage.setItem('isAuthenticated', true)
    localStorage.setItem('userId', userId)
    localStorage.setItem('userEmail', userEmail)
  }

  // Función para cerrar sesión y limpiar localStorage
  const logout = async () => {
    setIsAuthenticated(false)
    setUserId('')
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userId')
    localStorage.removeItem('userEmail')
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      login,
      logout,
      userId,
      setUserId
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use the context
export const useAuth = () => useContext(AuthContext)
