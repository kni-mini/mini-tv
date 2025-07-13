'use client';

import { useEffect, useState } from 'react';
import { getActiveAnnouncements } from '@/lib/announcements/actions';
import { getOrganizationById } from '@/lib/organizations/actions';
import { getMediaById } from '@/lib/media/actions';

interface AnnouncementWithMedia {
  id: number;
  announcementName: string;
  organizationName: string;
  organizationLogo?: string;
  media?: string;
  mediaType?: 'image' | 'video' | 'gif';
  mediaAlt?: string;
  text: string;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  deletedAt?: Date;
}

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState<AnnouncementWithMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        setLoading(true);
        const activeAnnouncements = await getActiveAnnouncements();
        const mediaCache: Record<number, Awaited<ReturnType<typeof getMediaById>>> = {};

        const announcementsWithMedia = await Promise.all(
          activeAnnouncements.map(async (announcement) => {
            const transformedAnnouncement: AnnouncementWithMedia = {
              id: announcement.id,
              announcementName: announcement.name,
              organizationName: '',
              text: announcement.message,
              startDate: announcement.startDate,
              endDate: announcement.endDate || undefined,
              createdAt: announcement.createdAt,
              deletedAt: announcement.deletedAt || undefined,
            };

            const [organization, media] = await Promise.all([
              announcement.organizationId ? getOrganizationById(announcement.organizationId) : null,
              announcement.mediaId
                ? (mediaCache[announcement.mediaId] ??= await getMediaById(announcement.mediaId))
                : null,
            ]);

            if (organization) {
              transformedAnnouncement.organizationName = organization.name;
              transformedAnnouncement.organizationLogo = organization.mediaId
                ? (mediaCache[organization.mediaId] ??= await getMediaById(organization.mediaId))
                    ?.file
                : undefined;
            }

            if (media) {
              transformedAnnouncement.media = media.file;
              transformedAnnouncement.mediaType = media.type;
              transformedAnnouncement.mediaAlt = media.name || undefined;
            }

            return transformedAnnouncement;
          })
        );

        setAnnouncements(announcementsWithMedia);
      } catch (err) {
        setError('Failed to fetch announcements:' + (err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchAnnouncements();
  }, []);

  return { announcements, loading, error };
}
