import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/hooks/useAuth'
import ProtectedRoute from '@/components/ProtectedRoute'
import AdminLayout from '@/components/layout/AdminLayout'
import PublicLayout from '@/components/layout/PublicLayout'
import Home from '@/pages/public/Home'
import Projects from '@/pages/public/Projects'
import Blog from '@/pages/public/Blog'
import BlogPost from '@/pages/public/BlogPost'
import Login from '@/pages/auth/Login'
import Dashboard from '@/pages/admin/Dashboard'
import ProjectEditor from '@/pages/admin/ProjectEditor'
import ProjectsList from '@/pages/admin/ProjectsList'
import PostEditor from '@/pages/admin/PostEditor'
import PostsList from '@/pages/admin/PostsList'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Route>
          
          <Route path="/auth/login" element={<Login />} />

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/projects" element={<ProjectsList />} />
              <Route path="/admin/projects/:id" element={<ProjectEditor />} />
              <Route path="/admin/posts" element={<PostsList />} />
              <Route path="/admin/posts/:id" element={<PostEditor />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
