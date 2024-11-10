import { createContext, useContext, useState } from 'react'

// Create the context
export const AuthContext = createContext()

// Context Provider
export function AuthProvider ({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem('isAuthenticated')) || false
  )
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '')
  // Función para iniciar sesión y almacenar en localStorage
  const login = async (userId) => {
    setIsAuthenticated(true)
    setUserId(userId)
    localStorage.setItem('isAuthenticated', true)
    localStorage.setItem('userId', userId)
  }

  // Función para cerrar sesión y limpiar localStorage
  const logout = async () => {
    setIsAuthenticated(false)
    setUserId('')
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userId')
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
