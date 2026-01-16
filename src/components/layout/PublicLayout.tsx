import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="py-8 border-t border-slate-100 dark:border-slate-900 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Dyzulk. Built with React & Supabase.</p>
      </footer>
    </div>
  )
}
