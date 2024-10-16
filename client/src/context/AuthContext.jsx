import { createContext, useContext, useState } from 'react'

// Create the context
export const AuthContext = createContext()

// Context Provider
export function AuthProvider ({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId]  = useState('')
  const login = () => setIsAuthenticated(true)
  const logout = () => setIsAuthenticated(false)

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
