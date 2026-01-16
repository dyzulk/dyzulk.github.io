import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Code, Terminal, Zap } from 'lucide-react'
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
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
        
        <div className="container px-4 text-center z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              Build. Deploy. Scale.
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
              Full-stack developer specializing in modern web technologies, serverless architectures, and high-performance applications.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/projects" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                View Work
              </Link>
              <Link to="/blog" className="px-6 py-3 border border-slate-300 dark:border-slate-700 rounded-lg font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                Read Blog
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services/Tech Stack */}
      <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="container px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Code, title: "Frontend Dev", desc: "React, TypeScript, Tailwind CSS, Next.js" },
              { icon: Terminal, title: "Backend Systems", desc: "Node.js, Supabase, PostgreSQL, APIs" },
              { icon: Zap, title: "Performance", desc: "Serverless (Cloudflare), Optimization, SEO" }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                <item.icon className="mx-auto mb-4 text-blue-500" size={32} />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-24 container px-4 mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
            <p className="text-slate-500">Some of my latest work.</p>
          </div>
          <Link to="/projects" className="text-blue-600 hover:underline flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.projects.map((project) => (
             <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
         <div className="container px-4 mx-auto">
           <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest Articles</h2>
              <p className="text-slate-500">Thoughts on technology and coding.</p>
            </div>
            <Link to="/blog" className="text-blue-600 hover:underline flex items-center gap-1">
              Read Blog <ArrowRight size={16} />
            </Link>
          </div>
          <div className="space-y-6 max-w-4xl mx-auto">
             {data.posts.map((post) => (
               <Link to={`/blog/${post.slug}`} key={post.id} className="block group">
                 <article className="flex justify-between items-start p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
                        {post.excerpt}
                      </p>
                      <span className="text-sm text-slate-500">{new Date(post.created_at).toLocaleDateString()}</span>
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
