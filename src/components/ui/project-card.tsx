import { ExternalLink, Github } from 'lucide-react'

interface ProjectCardProps {
  project: any // Type this properly later
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image */}
      <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        {project.cover_image ? (
          <img 
            src={project.cover_image} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech_stack?.map((tech: string) => (
            <span key={tech} className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md">
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
          {project.demo_url && (
            <a 
              href={project.demo_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
          {project.repo_url && (
            <a 
              href={project.repo_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white"
            >
              <Github size={14} /> Code
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
