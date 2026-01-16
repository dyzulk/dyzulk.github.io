import { useState } from 'react';

interface UploadResult {
  url: string;
  fileName: string;
}

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File, folder: string = 'uploads'): Promise<UploadResult | null> => {
    setUploading(true);
    setError(null);

    try {
      // 1. Get Presigned URL from Worker
      const workerUrl = import.meta.env.VITE_WORKER_URL;
      const fileName = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      
      const response = await fetch(workerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName,
          fileType: file.type,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get upload URL');
      }

      const { url: presignedUrl } = await response.json();

      // 2. Upload to R2 directly
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file to storage');
      }

      // 3. Return Public URL
      const publicDomain = import.meta.env.VITE_R2_PUBLIC_DOMAIN;
      const publicUrl = `${publicDomain}/${fileName}`;
      
      return { url: publicUrl, fileName };

    } catch (err: any) {
      console.error('Upload Error:', err);
      setError(err.message || 'Upload failed');
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadFile, uploading, error };
};
