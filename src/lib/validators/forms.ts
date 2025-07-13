import { z } from 'zod';

export const announcementSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name must be less than 255 characters'),
  message: z.string().min(1, 'Message is required'),
  groupId: z.coerce.number().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  // Media upload fields
  mediaName: z.string().optional(),
  mediaType: z.enum(['image', 'gif', 'video']).optional(),
  mediaFile: z.string().optional(), // base64 encoded file
});

export const posterSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name must be less than 255 characters'),
  groupId: z.coerce.number().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  // Media upload fields - required for posters
  mediaName: z.string().min(1, 'Media name is required'),
  mediaType: z.enum(['image', 'gif', 'video'], {
    errorMap: () => ({ message: 'Please select a valid media type' }),
  }),
  mediaFile: z.string().min(1, 'Media file is required'),
});

export const mediaSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name must be less than 255 characters'),
  type: z.enum(['image', 'gif', 'video'], {
    errorMap: () => ({ message: 'Please select a valid media type' }),
  }),
  file: z.string().min(1, 'File is required'),
});

export type AnnouncementFormData = z.infer<typeof announcementSchema>;
export type PosterFormData = z.infer<typeof posterSchema>;
export type MediaFormData = z.infer<typeof mediaSchema>;
