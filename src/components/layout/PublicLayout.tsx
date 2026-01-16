import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-white/20">
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <Outlet />
      </main>
      <footer className="py-8 border-t border-white/5 text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} DyzulkDev. Built with React & Supabase.</p>
      </footer>
    </div>
  )
}
