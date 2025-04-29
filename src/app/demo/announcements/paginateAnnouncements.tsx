import React from 'react';
import Announcement from '@/components/Announcement';
import type { AnnouncementProps } from '@/components/Announcement';

export type WeightedAnnouncement = AnnouncementProps & { weight: number };

export function paginateAnnouncements(announcements: AnnouncementProps[]): AnnouncementProps[][] {
  const pages: AnnouncementProps[][] = [];
  let currentPage: WeightedAnnouncement[] = [];
  let currentWeight = 0;

  for (const announcement of announcements) 
  {
    const hasMedia = announcement.mediaId !== undefined;
    const weight = hasMedia ? 30 : 20;

    if (currentWeight + weight > 100) 
    {
      pages.push(currentPage.map(a => ({ ...a })));
      currentPage = [];
      currentWeight = 0;
    }

    currentPage.push({ ...announcement, weight });
    currentWeight += weight;
  }

  if (currentPage.length > 0) 
  {
    pages.push(currentPage.map(a => ({ ...a })));
  }

  return pages;
}