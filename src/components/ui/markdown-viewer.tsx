import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

interface MarkdownViewerProps {
  content: string
  className?: string
}

export function MarkdownViewer({ content, className }: MarkdownViewerProps) {
  return (
    <div className={cn("prose prose-slate dark:prose-invert max-w-none", className)}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({node, ...props}) => (
            <img 
              {...props} 
              className="rounded-lg shadow-md my-6 w-full object-cover max-h-[500px]" 
              loading="lazy"
            />
          ),
          a: ({node, ...props}) => (
            <a {...props} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" />
          ),
          pre: ({node, ...props}) => (
             <pre {...props} className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto my-4" />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
