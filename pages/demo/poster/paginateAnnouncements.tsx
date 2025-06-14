// page: demo/poster/paginateAnnouncements.tsx
import React from 'react';
import Announcement from '@/components/Announcement';
import type { AnnouncementProps } from '@/components/Announcement';

export type WeightedAnnouncement = AnnouncementProps & { weight: number };

export function paginateAnnouncements(
  announcements: AnnouncementProps[],
  pageSize: number = 5
): AnnouncementProps[][] {
  const now = new Date();
  // Filter out future‐dated announcements
  const active = announcements.filter((a) => a.startDate <= now);

  // Then chunk into pages of size `pageSize`
  const pages: AnnouncementProps[][] = [];
  for (let i = 0; i < active.length; i += pageSize) {
    pages.push(active.slice(i, i + pageSize));
  }
  return pages;
}