import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Loader2, Plus, Pencil, Trash2, ExternalLink } from 'lucide-react'

export default function ProjectsList() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    if (data) setProjects(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return
    
    await supabase.from('projects').delete().eq('id', id)
    setProjects(projects.filter(p => p.id !== id))
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Link to="/admin/projects/new" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus size={18} /> New Project
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-medium border-b border-slate-100 dark:border-slate-800">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4 hidden md:table-cell">Tech Stack</th>
              <th className="p-4 hidden md:table-cell">Links</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="p-4">
                  <div className="font-medium">{project.title}</div>
                  <div className="text-xs text-slate-400 font-mono mt-1">/{project.slug}</div>
                </td>
                <td className="p-4 hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {project.tech_stack?.slice(0, 3).map((t: string) => (
                      <span key={t} className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded">
                        {t}
                      </span>
                    ))}
                    {project.tech_stack?.length > 3 && <span className="text-xs text-slate-400">+{project.tech_stack.length - 3}</span>}
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell">
                   {project.demo_url && (
                     <a href={project.demo_url} target="_blank" rel="noopener" className="text-blue-500 hover:underline text-sm flex items-center gap-1">
                       <ExternalLink size={12} /> Live
                     </a>
                   )}
                </td>
                <td className="p-4 text-right space-x-2">
                  <Link to={`/admin/projects/${project.id}`} className="inline-flex p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                    <Pencil size={18} />
                  </Link>
                  <button onClick={() => handleDelete(project.id)} className="inline-flex p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">
                  No projects found. Create your first one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
