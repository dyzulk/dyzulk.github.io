import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { ImageUpload } from '@/components/ui/image-upload'
import { Loader2, Save, ArrowLeft } from 'lucide-react'

export default function ProjectEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = id !== 'new'

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    cover_image: '',
    demo_url: '',
    repo_url: '',
    tech_stack: [] as string[],
    featured: false
  })
  
  // Tag input state
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    if (isEditing) fetchProject(id!)
  }, [id])

  const fetchProject = async (id: string) => {
    const { data } = await supabase.from('projects').select('*').eq('id', id).single()
    if (data) setFormData({ ...data, tech_stack: data.tech_stack || [] })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSlugGen = () => {
    // Auto-generate slug from title
    const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    setFormData(prev => ({ ...prev, slug }))
  }

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!formData.tech_stack.includes(tagInput.trim())) {
        setFormData(prev => ({ ...prev, tech_stack: [...prev.tech_stack, tagInput.trim()] }))
      }
      setTagInput('')
    }
  }

  const removeTag = (tagFn: string) => {
    setFormData(prev => ({ ...prev, tech_stack: prev.tech_stack.filter(t => t !== tagFn) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isEditing) {
        await supabase.from('projects').update(formData).eq('id', id)
      } else {
        await supabase.from('projects').insert([formData])
      }
      navigate('/admin')
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Error saving project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/admin')} className="text-slate-500 hover:text-blue-500">
           <ArrowLeft />
        </button>
        <h1 className="text-3xl font-bold">{isEditing ? 'Edit Project' : 'New Project'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <input 
              name="title" 
              value={formData.title} 
              onChange={handleChange}
              onBlur={handleSlugGen} 
              className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700" 
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug (URL)</label>
            <input 
              name="slug" 
              value={formData.slug} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 font-mono text-sm" 
              required 
            />
          </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Cover Image</label>
            <ImageUpload 
              currentImage={formData.cover_image} 
              onUpload={(url) => setFormData({...formData, cover_image: url})} 
            />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Short Description</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            rows={3}
            className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700" 
          />
        </div>

        {/* Tech Stack Tags */}
        <div className="space-y-2">
            <label className="text-sm font-medium">Tech Stack (Press Enter)</label>
            <input 
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              placeholder="React, Supabase, etc..."
            />
            <div className="flex flex-wrap gap-2 mt-2">
                {formData.tech_stack.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm flex items-center gap-1">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="hover:text-blue-900">×</button>
                    </span>
                ))}
            </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Content (Markdown supported)</label>
          <textarea 
            name="content" 
            value={formData.content} 
            onChange={handleChange} 
            rows={10}
            className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 font-mono" 
          />
          <p className="text-xs text-slate-500">Tip: You can drag & drop images into a markdown editor later, for now paste URLs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
             <label className="text-sm font-medium">Demo URL</label>
             <input name="demo_url" value={formData.demo_url} onChange={handleChange} className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-800" />
           </div>
           <div className="space-y-2">
             <label className="text-sm font-medium">Repo URL</label>
             <input name="repo_url" value={formData.repo_url} onChange={handleChange} className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-800" />
           </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
          Save Project
        </button>

      </form>
    </div>
  )
}
