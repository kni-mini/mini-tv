'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PosterFormData, posterSchema } from '@/lib/validators/forms';
import { createPoster } from '@/lib/posters/actions';
import { getAllGroups } from '@/lib/groups/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Group {
  id: number;
  name: string;
}

export function PosterForm() {
  const router = useRouter();
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PosterFormData>({
    resolver: zodResolver(posterSchema),
    defaultValues: {
      startDate: new Date().toISOString().slice(0, 16), // Current date-time in local format
    },
  });

  useEffect(() => {
    async function loadData() {
      try {
        const groupData = await getAllGroups();
        setGroups(groupData);
      } catch (error) {
        console.error('Error loading form data:', error);
        toast.error('Failed to load form data');
      }
    }
    loadData();
  }, []);

  const onSubmit = async (data: PosterFormData) => {
    setIsLoading(true);
    try {
      const result = await createPoster(data);
      if (result.success) {
        toast.success('Poster created successfully!');
        reset();
        router.push('/admin');
      } else {
        toast.error(result.error || 'Failed to create poster');
      }
    } catch (error) {
      console.error('Error creating poster:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" {...register('name')} placeholder="Enter poster name" />
        {errors.name && <p className="form-error">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="mediaName">Media Name *</Label>
        <Input id="mediaName" {...register('mediaName')} placeholder="Enter media name" />
        {errors.mediaName && <p className="form-error">{errors.mediaName.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="mediaType">Media Type *</Label>
        <Select id="mediaType" {...register('mediaType')}>
          <option value="">Select media type</option>
          <option value="image">Image</option>
          <option value="gif">GIF</option>
          <option value="video">Video</option>
        </Select>
        {errors.mediaType && <p className="form-error">{errors.mediaType.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="mediaFile">Media File *</Label>
        <Input id="mediaFile" type="file" {...register('mediaFile')} accept="image/*,video/*" />
        {errors.mediaFile && <p className="form-error">{errors.mediaFile.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="groupId">Group (Optional)</Label>
        <Select id="groupId" {...register('groupId')}>
          <option value="">Select a group</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </Select>
        {errors.groupId && <p className="form-error">{errors.groupId.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date *</Label>
          <Input id="startDate" type="datetime-local" {...register('startDate')} />
          {errors.startDate && <p className="form-error">{errors.startDate.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date (Optional)</Label>
          <Input id="endDate" type="datetime-local" {...register('endDate')} />
          {errors.endDate && <p className="form-error">{errors.endDate.message}</p>}
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Poster'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin')}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
