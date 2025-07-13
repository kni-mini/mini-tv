'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnnouncementFormData, announcementSchema } from '@/lib/validators/forms';
import { createAnnouncement } from '@/lib/announcements/actions';
import { getAllGroups } from '@/lib/groups/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Organization {
  id: number;
  name: string;
}

interface Group {
  id: number;
  name: string;
}

interface Media {
  id: number;
  name: string | null;
  type: 'image' | 'gif' | 'video';
}

export function AnnouncementForm() {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [medias, setMedias] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      startDate: new Date().toISOString().slice(0, 16), // Current date-time in local format
    },
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [groupData] = await Promise.all([getAllGroups()]);
        setGroups(groupData);
      } catch (error) {
        console.error('Error loading form data:', error);
        toast.error('Failed to load form data');
      }
    }
    loadData();
  }, []);

  const onSubmit = async (data: AnnouncementFormData) => {
    setIsLoading(true);
    try {
      const result = await createAnnouncement(data);
      if (result.success) {
        toast.success('Announcement created successfully!');
        reset();
        router.push('/admin');
      } else {
        toast.error(result.error || 'Failed to create announcement');
      }
    } catch (error) {
      console.error('Error creating announcement:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

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
          {isLoading ? 'Creating...' : 'Create Announcement'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin')}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
