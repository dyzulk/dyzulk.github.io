import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Link } from 'react-router-dom'
import { Loader2, Calendar, ArrowRight } from 'lucide-react'

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

  if (loading) return <div className="flex justify-center items-center h-[50vh]"><Loader2 className="animate-spin text-white" /></div>

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">Writing</h1>
        <p className="text-muted-foreground">Thoughts, tutorials, and insights on development.</p>
      </div>
      
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="group relative">
            <Link to={`/blog/${post.slug}`} className="block p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
               <div className="flex flex-col md:flex-row gap-8">
                  {/* Content */}
                  <div className="flex-1 order-2 md:order-1">
                    <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground mb-4">
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      {post.tags?.length > 0 && (
                        <>
                          <span>•</span>
                          <span className="text-primary/80">#{post.tags[0]}</span>
                        </>
                      )}
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                        {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-3 mb-6">
                      {post.excerpt || 'No description available.'}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-medium text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all">
                      Read Article <ArrowRight size={16} />
                    </div>
                  </div>

                  {/* Optional Image */}
                  {post.cover_image && (
                    <div className="w-full md:w-48 h-32 md:h-auto flex-shrink-0 order-1 md:order-2">
                       <div className="w-full h-full rounded-xl overflow-hidden bg-white/5 border border-white/5">
                         <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                       </div>
                    </div>
                  )}
               </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
