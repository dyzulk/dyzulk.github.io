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

  if (loading) return <div className="flex justify-center items-center h-[50vh]"><Loader2 className="animate-spin text-white" /></div>

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold mb-4 text-white">Post not found</h1>
        <Link to="/blog" className="text-muted-foreground hover:text-white transition-colors">← Back to Blog</Link>
      </div>
    )
  }

  return (
    <article className="min-h-screen pb-20">
      {/* Header */}
      <header className="relative py-20 md:py-32 container mx-auto px-4 max-w-4xl text-center">
         <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-blue-500/5 to-transparent blur-3xl" />
         
         <Link to="/blog" className="relative inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Blog
         </Link>

         <h1 className="relative text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight text-white">
           {post.title}
         </h1>

         <div className="relative flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
               <Calendar size={14} />
               {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            {post.tags?.length > 0 && (
               <div className="flex gap-2">
                 {post.tags.map((tag: string) => (
                   <span key={tag} className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-xs font-mono text-white/80">
                     #{tag}
                   </span>
                 ))}
               </div>
            )}
         </div>
      </header>

      {/* Hero Image */}
         {post.cover_image && (
          <div className="container mx-auto px-4 max-w-5xl mb-16">
             <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-20" />
             </div>
          </div>
         )}

      {/* Content */}
      <div className="container mx-auto px-4 max-w-4xl">
         <div className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl">
            <div className="prose prose-invert prose-lg max-w-none">
                <MarkdownViewer content={post.content || ''} />
            </div>
         </div>
      </div>
    </article>
  )
}
