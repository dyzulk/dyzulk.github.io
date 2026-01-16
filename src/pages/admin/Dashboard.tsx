import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { StatCard } from '@/components/ui/stat-card'
import { FileText, Briefcase, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, posts: 0 })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    const [proj, posts] = await Promise.all([
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('posts').select('*', { count: 'exact', head: true }),
    ])
    
    setStats({
      projects: proj.count || 0,
      posts: posts.count || 0,
    })
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard 
          label="Total Projects" 
          value={stats.projects} 
          icon={Briefcase} 
          color="text-blue-500" 
        />
        <StatCard 
          label="Blog Posts" 
          value={stats.posts} 
          icon={FileText} 
          color="text-purple-500" 
        />
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
      <div className="flex gap-4">
        <Link to="/admin/projects/new" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus size={18} /> Add Project
        </Link>
        <Link to="/admin/posts/new" className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          <Plus size={18} /> Write Article
        </Link>
      </div>
    </div>
  )
}
