import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          const userData = await authService.getCurrentUser()
          setUser(userData)
        } catch (error) {
          console.error('Failed to get current user:', error)
          localStorage.removeItem('token')
          setToken(null)
        }
      }
      setLoading(false)
    }

    initializeAuth()
  }, [token])

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password)
      const { user: userData, token: authToken } = response.data

      setUser(userData)
      setToken(authToken)
      localStorage.setItem('token', authToken)

      toast.success('Login successful!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const register = async (userData) => {
    try {
      const response = await authService.register(userData)
      const { user: newUser, token: authToken } = response.data

      setUser(newUser)
      setToken(authToken)
      localStorage.setItem('token', authToken)

      toast.success('Registration successful!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      setToken(null)
      localStorage.removeItem('token')
      toast.success('Logged out successfully')
    }
  }

  const updateProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(profileData)
      setUser(response.data.user)
      toast.success('Profile updated successfully!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const refreshToken = async () => {
    try {
      const response = await authService.refreshToken()
      const { token: newToken } = response.data
      
      setToken(newToken)
      localStorage.setItem('token', newToken)
      return { success: true }
    } catch (error) {
      console.error('Token refresh failed:', error)
      logout()
      return { success: false }
    }
  }

  const isAuthenticated = () => {
    return !!user && !!token
  }

  const hasRole = (roles) => {
    if (!user) return false
    if (Array.isArray(roles)) {
      return roles.includes(user.role)
    }
    return user.role === roles
  }

  const isAdmin = () => hasRole('admin')
  const isInstructor = () => hasRole(['instructor', 'admin'])
  const isStudent = () => hasRole(['student', 'instructor', 'admin'])

  const value = {
    user,
    loading,
    token,
    login,
    register,
    logout,
    updateProfile,
    refreshToken,
    isAuthenticated,
    hasRole,
    isAdmin,
    isInstructor,
    isStudent,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 