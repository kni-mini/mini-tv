'use client';

import React, { useEffect, useState } from 'react';
import { Announcement } from '@components/announcement/announcement';
import { Poster } from '@components/poster/poster';
import { getActiveAnnouncements } from '@/lib/announcements/actions';
import { getActivePosters } from '@/lib/posters/actions';
import { getOrganizationById } from '@/lib/organizations/actions';
import { getMediaById } from '@/lib/media/actions';
import { CircularProgress } from '@mui/material';

// Types for announcement and poster
interface AnnouncementItem {
  type: 'announcement';
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

interface PosterItem {
  type: 'poster';
  id: number;
  media: string;
  mediaType: 'image' | 'video' | 'gif';
  mediaAlt?: string;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  deletedAt?: Date;
}

type DisplayItem = AnnouncementItem | PosterItem;

// Helper to fetch and transform all active posters with media
async function fetchPostersWithMedia(): Promise<PosterItem[]> {
  const posters = await getActivePosters();
  const result = await Promise.all(
    posters.map(async (poster) => {
      const media = poster.mediaId ? await getMediaById(poster.mediaId) : null;
      return {
        type: 'poster' as const,
        id: poster.id,
        media: media?.file || '',
        mediaType: (media?.type as 'image' | 'video' | 'gif') || 'image',
        mediaAlt: media?.name || undefined,
        startDate: poster.startDate,
        endDate: poster.endDate || undefined,
        createdAt: poster.createdAt,
        deletedAt: poster.deletedAt || undefined,
      };
    })
  );
  return result;
}

// Helper to fetch and transform all active announcements with org and media
async function fetchAnnouncementsWithMedia(): Promise<AnnouncementItem[]> {
  const announcements = await getActiveAnnouncements();
  const mediaCache: Record<string, Awaited<ReturnType<typeof getMediaById>>> = {};
  const result = await Promise.all(
    announcements.map(async (announcement) => {
      const [organization, media] = await Promise.all([
        announcement.organizationId ? getOrganizationById(announcement.organizationId) : null,
        announcement.mediaId
          ? (mediaCache[String(announcement.mediaId)] ??= await getMediaById(announcement.mediaId))
          : null,
      ]);
      return {
        type: 'announcement' as const,
        id: announcement.id,
        announcementName: announcement.name,
        organizationName: organization?.name || '',
        organizationLogo: organization?.mediaId
          ? (mediaCache[String(organization.mediaId)] ??= await getMediaById(organization.mediaId))
              ?.file
          : undefined,
        media: media?.file,
        mediaType: (media?.type as 'image' | 'video' | 'gif') || undefined,
        mediaAlt: media?.name || undefined,
        text: announcement.message,
        startDate: announcement.startDate,
        endDate: announcement.endDate || undefined,
        createdAt: announcement.createdAt,
        deletedAt: announcement.deletedAt || undefined,
      };
    })
  );
  return result;
}

export default function DemoPage() {
  const [items, setItems] = useState<DisplayItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const switchInterval = 6000; // ms

  useEffect(() => {
    let isMounted = true;
    async function fetchAll() {
      setLoading(true);
      setError(null);
      try {
        const [announcements, posters] = await Promise.all([
          fetchAnnouncementsWithMedia(),
          fetchPostersWithMedia(),
        ]);
        // Merge and sort by startDate (descending)
        const merged = [...announcements, ...posters].sort(
          (a, b) => b.startDate.getTime() - a.startDate.getTime()
        );
        if (isMounted) setItems(merged);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchAll();
    return () => {
      isMounted = false;
    };
  }, []);

  // Animation and switching logic
  useEffect(() => {
    if (!items.length) return;
    setFade(true);
    const timer = setTimeout(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIdx((idx) => (idx + 1) % items.length);
        setFade(true);
      }, 400); // fade out duration
    }, switchInterval);
    return () => clearTimeout(timer);
  }, [currentIdx, items.length]);

  if (loading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress />
      </div>
    );
  }
  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>{error}</div>;
  }
  if (!items.length) {
    return (
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        No announcements or posters to display.
      </div>
    );
  }

  const item = items[currentIdx];

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f7f7f7',
        transition: 'background 0.5s',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: fade ? 1 : 0,
          transition: 'opacity 0.4s cubic-bezier(.4,0,.2,1)',
        }}
      >
        {item.type === 'announcement' ? <Announcement {...item} /> : <Poster {...item} />}
      </div>
    </div>
  );
}
