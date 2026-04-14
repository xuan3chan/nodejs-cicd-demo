import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AdminPage from './pages/admin/AdminPage'
import LoginPage from './pages/admin/LoginPage'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('admin_token')
  if (!token) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}

import SEO from './components/seo/SEO'

function App() {
  return (
    <BrowserRouter>
      <SEO />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
