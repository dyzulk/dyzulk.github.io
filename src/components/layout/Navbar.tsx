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
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex items-center gap-1 p-1 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl shadow-lg ring-1 ring-white/5">
        <Link 
          to="/" 
          className="ml-2 mr-4 flex items-center gap-2 font-bold text-white tracking-tight"
        >
          <img src="/logo.svg" alt="Dyzulk" className="w-6 h-6" />
          <span>Dyzulk.</span>
        </Link>
        
        <div className="flex items-center gap-1 pr-1">
          {links.map((link) => {
            const isActive = location.pathname === link.href
            return (
              <Link 
                key={link.href} 
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  isActive 
                    ? "bg-white text-black shadow-sm" 
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
