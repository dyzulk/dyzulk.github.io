import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Link } from 'react-router-dom'
import { Loader2, Calendar } from 'lucide-react'

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      setPosts(data)
    }
    setLoading(false)
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog & Tutorials</h1>
      
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.id} className="flex flex-col md:flex-row gap-6 border-b border-slate-100 dark:border-slate-800 pb-8 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-900/50 p-4 rounded-xl transition-colors">
            {post.cover_image && (
              <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-slate-200">
                <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                <Calendar size={14} />
                {new Date(post.created_at).toLocaleDateString()}
                <div className="flex gap-2">
                  {post.tags?.map((tag: string) => (
                    <span key={tag} className="text-blue-500 font-medium">#{tag}</span>
                  ))}
                </div>
              </div>
              <Link to={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 transition-colors">
                    {post.title}
                </h2>
              </Link>
              <p className="text-slate-600 dark:text-slate-400 line-clamp-2">
                {post.excerpt || 'No description available.'}
              </p>
              <Link to={`/blog/${post.slug}`} className="inline-block mt-4 text-sm font-medium text-blue-600 hover:underline">
                Read Article →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
