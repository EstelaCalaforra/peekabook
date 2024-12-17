import { useAuth } from '../context/AuthContext'

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  console.log({ isAuthenticated })

  return isAuthenticated ? children : null
}
