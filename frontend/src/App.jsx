import { Routes, Route } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

// Public Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CourseList from './pages/CourseList'
import CourseDetail from './pages/CourseDetail'

// Protected Pages
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import CourseCreate from './pages/CourseCreate'
import CourseEdit from './pages/CourseEdit'
import LessonView from './pages/LessonView'
import QuizView from './pages/QuizView'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import UserManagement from './pages/admin/UserManagement'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner-primary h-8 w-8"></div>
      </div>
    )
  }

  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        
        {/* Auth Routes */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/courses/create" 
          element={
            <ProtectedRoute roles={['instructor', 'admin']}>
              <CourseCreate />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/courses/:id/edit" 
          element={
            <ProtectedRoute roles={['instructor', 'admin']}>
              <CourseEdit />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/lessons/:id" 
          element={
            <ProtectedRoute>
              <LessonView />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/quizzes/:id" 
          element={
            <ProtectedRoute>
              <QuizView />
            </ProtectedRoute>
          } 
        />

        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute roles={['admin']}>
              <UserManagement />
            </ProtectedRoute>
          } 
        />

        {/* 404 Route */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
              <p className="text-xl text-gray-600 mb-8">Page not found</p>
              <a href="/" className="btn-primary">
                Go Home
              </a>
            </div>
          </div>
        } />
      </Routes>
    </Layout>
  )
}

export default App 