'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MediaFormData, mediaSchema } from '@/lib/validators/forms';
import { createMedia } from '@/lib/media/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface MediaFormProps {
  onSuccess?: (mediaId: number) => void;
}

export function MediaForm({ onSuccess }: MediaFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<MediaFormData>({
    resolver: zodResolver(mediaSchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setValue('file', base64);
      };
      reader.readAsDataURL(file);

      // Auto-detect file type
      if (file.type.startsWith('image/')) {
        if (file.type === 'image/gif') {
          setValue('type', 'gif');
        } else {
          setValue('type', 'image');
        }
      } else if (file.type.startsWith('video/')) {
        setValue('type', 'video');
      }

      // Set default name to filename without extension
      if (!getValues('name')) {
        const nameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
        setValue('name', nameWithoutExtension);
      }
    }
  };

  const onSubmit = async (data: MediaFormData) => {
    setIsLoading(true);
    try {
      const result = await createMedia(data);
      if (result.success && result.data) {
        toast.success('Media uploaded successfully!');
        reset();
        onSuccess?.(result.data.id);
      } else {
        toast.error(result.error || 'Failed to upload media');
      }
    } catch (error) {
      console.error('Error uploading media:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" {...register('name')} placeholder="Enter media name" />
        {errors.name && <p className="form-error">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Type *</Label>
        <Select id="type" {...register('type')}>
          <option value="">Select media type</option>
          <option value="image">Image</option>
          <option value="gif">GIF</option>
          <option value="video">Video</option>
        </Select>
        {errors.type && <p className="form-error">{errors.type.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">File *</Label>
        <Input id="file" type="file" accept="image/*,video/*" onChange={handleFileChange} />
        {errors.file && <p className="form-error">{errors.file.message}</p>}
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Upload Media'}
      </Button>
    </form>
  );
}
