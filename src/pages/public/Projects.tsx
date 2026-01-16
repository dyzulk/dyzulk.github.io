import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ProjectCard } from '@/components/ui/project-card'
import { Loader2 } from 'lucide-react'

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      setProjects(data)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-white" size={32} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">My Work</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A collection of projects exploring web development, design, and new technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="h-[420px]">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center text-muted-foreground py-20 bg-white/5 rounded-2xl border border-white/5">
          <p>No projects found yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}
