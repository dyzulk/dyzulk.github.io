import { useState } from 'react'
import { useUpload } from '@/hooks/useUpload'
import { Upload, X, CheckCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
  onUpload: (url: string) => void
  currentImage?: string
  label?: string
}

export function ImageUpload({ onUpload, currentImage, label = "Project Image" }: ImageUploadProps) {
  const { uploadFile, uploading, error } = useUpload()
  const [preview, setPreview] = useState<string | undefined>(currentImage)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Preview
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    // Upload
    const result = await uploadFile(file, 'portfolio')
    if (result) {
      onUpload(result.url)
    }
  }

  const handleRemove = () => {
    setPreview(undefined)
    onUpload('')
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      
      <div className={cn(
        "relative rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 transition-colors",
        "hover:border-blue-500 dark:hover:border-blue-500 bg-slate-50 dark:bg-slate-900/50",
        preview ? "h-64" : "h-32"
      )}>
        {preview ? (
          <div className="relative h-full w-full p-2">
            <img 
              src={preview} 
              alt="Preview" 
              className="h-full w-full object-cover rounded-md" 
            />
            <button
              onClick={handleRemove}
              type="button"
              className="absolute top-3 right-3 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
            >
              <X size={16} />
            </button>
            {uploading && (
               <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
                 <Loader2 className="animate-spin text-white" size={32} />
               </div>
            )}
             {!uploading && !error && (
               <div className="absolute bottom-3 right-3 p-1.5 bg-green-500 text-white rounded-full shadow-lg">
                 <CheckCircle size={16} />
               </div>
            )}
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
            {uploading ? (
               <Loader2 className="animate-spin mb-2" size={24} />
            ) : (
              <Upload className="mb-2" size={24} />
            )}
            <span className="text-sm">Click to upload image</span>
            <input 
              type="file" 
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
