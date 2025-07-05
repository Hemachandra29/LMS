import { apiService } from './api'

export const authService = {
  // Login user
  login: (email, password) => {
    return apiService.post('/auth/login', { email, password })
  },

  // Register user
  register: (userData) => {
    return apiService.post('/auth/register', userData)
  },

  // Get current user
  getCurrentUser: () => {
    return apiService.get('/auth/me')
  },

  // Logout user
  logout: () => {
    return apiService.post('/auth/logout')
  },

  // Refresh token
  refreshToken: () => {
    return apiService.post('/auth/refresh')
  },

  // Forgot password
  forgotPassword: (email) => {
    return apiService.post('/auth/forgot-password', { email })
  },

  // Reset password
  resetPassword: (token, password) => {
    return apiService.post('/auth/reset-password', { token, password })
  },

  // Update profile
  updateProfile: (profileData) => {
    return apiService.put(`/users/${profileData.id}`, profileData)
  },

  // Get user by ID
  getUser: (userId) => {
    return apiService.get(`/users/${userId}`)
  },

  // Get all users (admin only)
  getUsers: (params = {}) => {
    return apiService.get('/users', { params })
  },

  // Update user role (admin only)
  updateUserRole: (userId, role) => {
    return apiService.patch(`/users/${userId}/role`, { role })
  },

  // Toggle user status (admin only)
  toggleUserStatus: (userId) => {
    return apiService.patch(`/users/${userId}/status`)
  },

  // Delete user (admin only)
  deleteUser: (userId) => {
    return apiService.delete(`/users/${userId}`)
  },

  // Get instructors (public)
  getInstructors: () => {
    return apiService.get('/users/instructors')
  },
} 