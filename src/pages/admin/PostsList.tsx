import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Loader2, Plus, Pencil, Trash2, Eye } from 'lucide-react'

export default function PostsList() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
    if (data) setPosts(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return
    
    await supabase.from('posts').delete().eq('id', id)
    setPosts(posts.filter(p => p.id !== id))
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Articles</h1>
        <Link to="/admin/posts/new" className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          <Plus size={18} /> New Article
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-medium border-b border-slate-100 dark:border-slate-800">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4 hidden md:table-cell">Status</th>
              <th className="p-4 hidden md:table-cell">Views</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="p-4">
                  <div className="font-medium">{post.title}</div>
                  <div className="text-xs text-slate-400 font-mono mt-1">/{post.slug}</div>
                </td>
                <td className="p-4 hidden md:table-cell">
                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                     post.published 
                       ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                       : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                   }`}>
                     {post.published ? 'Published' : 'Draft'}
                   </span>
                </td>
                <td className="p-4 hidden md:table-cell text-slate-500">
                   {post.view_count || 0}
                </td>
                <td className="p-4 text-right space-x-2">
                  <a href={`/blog/${post.slug}`} target="_blank" className="inline-flex p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                    <Eye size={18} />
                  </a>
                  <Link to={`/admin/posts/${post.id}`} className="inline-flex p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                    <Pencil size={18} />
                  </Link>
                  <button onClick={() => handleDelete(post.id)} className="inline-flex p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">
                  No articles found. Write your first one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
