import { ExternalLink, Github } from 'lucide-react'

interface ProjectCardProps {
  project: any // Type this properly later
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative glass-card h-full flex flex-col overflow-hidden">
      {/* Image */}
      <div className="aspect-video w-full overflow-hidden bg-white/5 border-b border-white/5">
        {project.cover_image ? (
          <img 
            src={project.cover_image} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors tracking-tight">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech_stack?.map((tech: string) => (
            <span key={tech} className="px-2.5 py-1 text-[10px] font-medium bg-white/5 border border-white/5 text-muted-foreground rounded-full">
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
          {project.demo_url && (
            <a 
              href={project.demo_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold text-white hover:text-blue-400 transition-colors"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
          {project.repo_url && (
            <a 
              href={project.repo_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-white transition-colors"
            >
              <Github size={14} /> Code
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
