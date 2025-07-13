'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnnouncementFormData, announcementSchema } from '@/lib/validators/forms';
import { updateAnnouncement, getAnnouncementById } from '@/lib/announcements/actions';
import { getAllGroups } from '@/lib/groups/actions';
import { getMediaById } from '@/lib/media/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';

interface Group {
  id: number;
  name: string;
}

interface AnnouncementEditFormProps {
  announcementId: number;
}

export function AnnouncementEditForm({ announcementId }: AnnouncementEditFormProps) {
  const router = useRouter();
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema),
  });

  const watchMediaFile = watch('mediaFile');

  useEffect(() => {
    async function loadData() {
      try {
        setDataLoading(true);
        const [groupData, announcementData] = await Promise.all([
          getAllGroups(),
          getAnnouncementById(announcementId),
        ]);

        setGroups(groupData);

        if (announcementData && announcementData[0]) {
          const announcement = announcementData[0];

          // Load existing media if any
          let existingMedia = null;
          if (announcement.mediaId) {
            existingMedia = await getMediaById(announcement.mediaId);
          }

          // Set form values
          setValue('name', announcement.name);
          setValue('message', announcement.message);
          setValue('groupId', announcement.groupId || undefined);
          setValue('startDate', new Date(announcement.startDate).toISOString().slice(0, 16));
          setValue(
            'endDate',
            announcement.endDate ? new Date(announcement.endDate).toISOString().slice(0, 16) : ''
          );

          if (existingMedia) {
            setValue('mediaFile', existingMedia.file);
            setValue('mediaType', existingMedia.type);
            setValue('mediaName', existingMedia.name || '');
          }
        }
      } catch (error) {
        console.error('Error loading form data:', error);
        toast.error('Failed to load announcement data');
      } finally {
        setDataLoading(false);
      }
    }
    loadData();
  }, [announcementId, setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Determine media type based on file
    let mediaType: 'image' | 'gif' | 'video';
    if (file.type.startsWith('image/')) {
      mediaType = file.type === 'image/gif' ? 'gif' : 'image';
    } else if (file.type.startsWith('video/')) {
      mediaType = 'video';
    } else {
      toast.error('Please select a valid image, gif, or video file');
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setValue('mediaFile', base64);
      setValue('mediaType', mediaType);

      // Set default name to filename without extension
      const nameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
      if (!watch('mediaName')) {
        setValue('mediaName', nameWithoutExtension);
      }
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: AnnouncementFormData) => {
    setIsLoading(true);
    try {
      const result = await updateAnnouncement(announcementId, data);
      if (result.success) {
        toast.success('Announcement updated successfully!');
        router.push('/admin/scheduled');
      } else {
        toast.error(result.error || 'Failed to update announcement');
      }
    } catch (error) {
      console.error('Error updating announcement:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (dataLoading) {
    return <div className="text-center py-4 text-foreground">Loading announcement data...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" {...register('name')} placeholder="Enter announcement name" />
        {errors.name && <p className="form-error">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Enter announcement message (supports markdown)"
          rows={4}
        />
        {errors.message && <p className="form-error">{errors.message.message}</p>}
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

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Media Upload (Optional)</h3>

        <div className="space-y-2">
          <Label htmlFor="mediaFile">Upload New Media File</Label>
          <Input id="mediaFile" type="file" accept="image/*,video/*" onChange={handleFileChange} />
          {watchMediaFile && (
            <p className="text-sm text-green-600 dark:text-green-400">
              ✓ File uploaded successfully
            </p>
          )}
        </div>

        {watchMediaFile && (
          <>
            <div className="space-y-2">
              <Label htmlFor="mediaName">Media Name</Label>
              <Input id="mediaName" {...register('mediaName')} placeholder="Enter media name" />
              {errors.mediaName && <p className="form-error">{errors.mediaName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="border border-border rounded-md p-4 max-w-md">
                {watch('mediaType') === 'video' ? (
                  <video
                    src={watchMediaFile}
                    controls
                    className="max-w-full h-auto rounded"
                    style={{ maxHeight: '200px' }}
                  />
                ) : (
                  <Image
                    src={watchMediaFile}
                    alt="Media preview"
                    className="max-w-full h-auto rounded"
                    style={{ maxHeight: '200px' }}
                  />
                )}
              </div>
            </div>
          </>
        )}
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
          {isLoading ? 'Updating...' : 'Update Announcement'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/scheduled')}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
