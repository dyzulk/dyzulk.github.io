import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { MarkdownViewer } from '@/components/ui/markdown-viewer'
import { Loader2, ArrowLeft, Calendar } from 'lucide-react'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) fetchPost(slug)
  }, [slug])

  const fetchPost = async (slug: string) => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    
    if (!error && data) {
      setPost(data)
    }
    setLoading(false)
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link to="/blog" className="text-blue-600 hover:underline">← Back to Blog</Link>
      </div>
    )
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Blog
      </Link>

      <header className="mb-8 items-center text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-4">
           <Calendar size={14} />
           {new Date(post.created_at).toLocaleDateString()}
           <span>•</span>
           <div className="flex gap-2">
             {post.tags?.map((tag: string) => (
               <span key={tag} className="text-blue-500 font-medium">#{tag}</span>
             ))}
           </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
          {post.title}
        </h1>
        {post.cover_image && (
          <div className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg mb-8">
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      <div className="bg-white dark:bg-slate-950">
         <MarkdownViewer content={post.content || ''} />
      </div>
    </article>
  )
}
