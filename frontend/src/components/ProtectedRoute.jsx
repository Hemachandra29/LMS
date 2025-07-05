import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, isAuthenticated, hasRole } = useAuth()

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  if (roles.length > 0 && !hasRole(roles)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default ProtectedRoute 