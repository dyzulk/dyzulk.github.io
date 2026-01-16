import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

interface MarkdownViewerProps {
  content: string
  className?: string
}

export function MarkdownViewer({ content, className }: MarkdownViewerProps) {
  return (
    <div className={cn("prose prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-400 prose-img:rounded-xl prose-img:border prose-img:border-white/10", className)}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({node, ...props}) => (
            <img 
              {...props} 
              className="rounded-xl shadow-lg my-8 w-full object-cover max-h-[600px] bg-white/5 border border-white/10" 
              loading="lazy"
            />
          ),
          a: ({node, ...props}) => (
            <a {...props} className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-400 transition-all" target="_blank" rel="noopener noreferrer" />
          ),
          pre: ({node, ...props}) => (
             <pre {...props} className="bg-zinc-950/50 border border-white/10 p-4 rounded-xl overflow-x-auto my-6" />
          ),
          code: ({node, ...props}) => {
             const {className, children, ...rest} = props
             const match = /language-(\w+)/.exec(className || '')
             return match ? (
               <code {...rest} className={className}>
                 {children}
               </code>
             ) : (
               <code {...rest} className="px-1.5 py-0.5 rounded-md bg-white/10 text-sm font-mono text-white/90">
                 {children}
               </code>
             )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
