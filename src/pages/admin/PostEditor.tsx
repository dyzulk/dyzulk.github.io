import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { ImageUpload } from '@/components/ui/image-upload'
import { Loader2, Save, ArrowLeft } from 'lucide-react'

export default function PostEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = id !== 'new'

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    tags: [] as string[],
    published: false
  })

  useEffect(() => {
    if (isEditing) fetchPost(id!)
  }, [id])

  const fetchPost = async (id: string) => {
    const { data } = await supabase.from('posts').select('*').eq('id', id).single()
    if (data) setFormData({ ...data, tags: data.tags || [] })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSlugGen = () => {
    const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    setFormData(prev => ({ ...prev, slug }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isEditing) {
        await supabase.from('posts').update(formData).eq('id', id)
      } else {
        await supabase.from('posts').insert([formData])
      }
      navigate('/admin')
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Error saving post')
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
        <h1 className="text-3xl font-bold">{isEditing ? 'Edit Article' : 'New Article'}</h1>
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
            <label className="text-sm font-medium">Slug</label>
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
          <label className="text-sm font-medium">Excerpt (Summary)</label>
          <textarea 
            name="excerpt" 
            value={formData.excerpt} 
            onChange={handleChange} 
            rows={2}
            className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Content (Markdown)</label>
          <textarea 
            name="content" 
            value={formData.content} 
            onChange={handleChange} 
            rows={15}
            className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 font-mono" 
          />
        </div>

        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="published"
            checked={formData.published} 
            onChange={(e) => setFormData({...formData, published: e.target.checked})} 
            className="w-5 h-5"
          />
          <label htmlFor="published" className="font-medium cursor-pointer">Publish Article</label>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
          Save Article
        </button>

      </form>
    </div>
  )
}
