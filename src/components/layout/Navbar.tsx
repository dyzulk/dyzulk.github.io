import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const location = useLocation()
  
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
          Dyzulk.
        </Link>
        
        <nav className="flex gap-6">
          {links.map((link) => (
            <Link 
              key={link.href} 
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-600",
                location.pathname === link.href ? "text-blue-600" : "text-slate-600 dark:text-slate-400"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
