import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Search, FileText, Code, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SearchCommand() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<{ projects: any[], posts: any[] }>({ projects: [], posts: [] })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    
    const openEvent = () => setOpen(true)

    document.addEventListener('keydown', down)
    document.addEventListener('open-search-palette', openEvent)
    
    return () => {
      document.removeEventListener('keydown', down)
      document.removeEventListener('open-search-palette', openEvent)
    }
  }, [])

  useEffect(() => {
    if (query.length === 0) {
      setResults({ projects: [], posts: [] })
      return
    }

    const search = async () => {
      setLoading(true)
      const [projectsRes, postsRes] = await Promise.all([
        supabase.from('projects').select('id, title').ilike('title', `%${query}%`).limit(5),
        supabase.from('posts').select('id, title, slug').ilike('title', `%${query}%`).limit(5)
      ])

      setResults({
        projects: projectsRes.data || [],
        posts: postsRes.data || []
      })
      setLoading(false)
    }

    const timeout = setTimeout(search, 300)
    return () => clearTimeout(timeout)
  }, [query])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      
      <div className="relative w-full max-w-lg overflow-hidden rounded-xl bg-[#0a0a0a] border border-white/10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <Command label="Global Search" className="w-full">
          <div className="flex items-center border-b border-white/10 px-4">
            <Search className="mr-2 h-5 w-5 shrink-0 text-white/50" />
            <Command.Input 
              value={query}
              onValueChange={setQuery}
              placeholder="Search projects or posts..."
              className="flex h-14 w-full rounded-md bg-transparent py-3 text-sm outline-none text-white placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          
          <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
            {loading && <div className="py-6 text-center text-sm text-neutral-500 flex items-center justify-center gap-2"><Loader2 className="animate-spin" size={14}/> Searching...</div>}
            {!loading && query && results.projects.length === 0 && results.posts.length === 0 && (
               <div className="py-6 text-center text-sm text-neutral-500">No results found.</div>
            )}

            {results.projects.length > 0 && (
              <Command.Group heading="Projects" className="text-xs font-medium text-neutral-500 px-2 py-1.5 mb-1">
                {results.projects.map((project) => (
                  <Command.Item
                    key={project.id}
                    onSelect={() => runCommand(() => navigate('/projects'))}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-neutral-200 aria-selected:bg-white/10 aria-selected:text-white cursor-pointer transition-colors"
                  >
                    <Code size={14} className="opacity-50" />
                    {project.title}
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {results.posts.length > 0 && (
              <Command.Group heading="Blog Posts" className="text-xs font-medium text-neutral-500 px-2 py-1.5 mb-1">
                {results.posts.map((post) => (
                  <Command.Item
                    key={post.id}
                    onSelect={() => runCommand(() => navigate(`/blog/${post.slug}`))}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-neutral-200 aria-selected:bg-white/10 aria-selected:text-white cursor-pointer transition-colors"
                  >
                    <FileText size={14} className="opacity-50" />
                    {post.title}
                  </Command.Item>
                ))}
              </Command.Group>
            )}
            
            {!query && (
              <div className="py-10 text-center text-sm text-neutral-600">
                <p>Type to search...</p>
                <div className="mt-2 text-xs flex justify-center gap-2">
                   <span className="bg-white/5 px-2 py-1 rounded border border-white/5">Projects</span>
                   <span className="bg-white/5 px-2 py-1 rounded border border-white/5">Blog</span>
                </div>
              </div>
            )}
          </Command.List>
        </Command>
      </div>
    </div>
  )
}
