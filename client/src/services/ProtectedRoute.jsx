import { useAuth } from '../context/AuthContext'

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? children : null
}
