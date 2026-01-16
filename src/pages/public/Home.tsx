import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { ProjectCard } from '@/components/ui/project-card'
import { motion } from 'framer-motion'

export default function Home() {
  const [data, setData] = useState<{projects: any[], posts: any[]}>({ projects: [], posts: [] })

  useEffect(() => {
    fetchHomeData()
  }, [])

  const fetchHomeData = async () => {
    const [projectsRes, postsRes] = await Promise.all([
      supabase.from('projects').select('*').limit(3).order('created_at', { ascending: false }),
      supabase.from('posts').select('*').limit(3).eq('published', true).order('created_at', { ascending: false })
    ])

    setData({
      projects: projectsRes.data || [],
      posts: postsRes.data || []
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container px-4 text-center z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground mb-8">
              <Sparkles size={12} className="text-yellow-200" />
              <span>Available for freelance work</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
              Crafting Digital <br/> Experiences.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Full-stack developer focused on building high-performance, accessible, and beautiful web applications using modern technologies.
            </p>

            <div className="flex justify-center gap-4">
              <Link to="/projects" className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors">
                View Work
              </Link>
              <Link to="/blog" className="px-8 py-3 bg-white/5 border border-white/10 rounded-full font-medium hover:bg-white/10 transition-colors backdrop-blur-sm">
                Read Blog
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-32 container px-4 mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-2 tracking-tight">Featured Projects</h2>
            <p className="text-muted-foreground">Selected works I've shipped recently.</p>
          </div>
          <Link to="/projects" className="text-sm font-medium hover:text-white text-muted-foreground transition-colors flex items-center gap-2">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projects.map((project) => (
             <div key={project.id} className="h-[400px]">
                <ProjectCard project={project} />
             </div>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-32 border-t border-white/5">
         <div className="container px-4 mx-auto max-w-4xl">
           <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-2 tracking-tight">Recent Thoughts</h2>
              <p className="text-muted-foreground">Writing about code, design, and my journey.</p>
            </div>
            <Link to="/blog" className="text-sm font-medium hover:text-white text-muted-foreground transition-colors flex items-center gap-2">
              All Posts <ArrowRight size={16} />
            </Link>
          </div>

          <div className="space-y-4">
             {data.posts.map((post) => (
               <Link to={`/blog/${post.slug}`} key={post.id} className="block group">
                 <article className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all duration-300">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-1 text-sm">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground min-w-fit">
                      <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                 </article>
               </Link>
             ))}
          </div>
         </div>
      </section>
    </div>
  )
}
