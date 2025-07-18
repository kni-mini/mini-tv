import type { AnnouncementProps } from '@/components/Announcement';

export type WeightedAnnouncement = AnnouncementProps & { weight: number };

export function paginateAnnouncements(announcements: AnnouncementProps[]): AnnouncementProps[][] {
  const pages: AnnouncementProps[][] = [];
  let currentPage: WeightedAnnouncement[] = [];
  let currentWeight = 0;
  const now = new Date();

  for (const announcement of announcements) {
    if (
      (announcement.startDate && announcement.startDate > now) ||
      (announcement.endDate && announcement.endDate < now) ||
      (announcement.deletedAt && announcement.deletedAt < now)
    ) {
      continue;
    }

    const hasMedia = announcement.mediaId !== undefined;
    const weight = hasMedia ? 30 : 20;

    if (currentWeight + weight > 100) {
      pages.push(currentPage.map((a) => ({ ...a })));
      currentPage = [];
      currentWeight = 0;
    }

    currentPage.push({ ...announcement, weight });
    currentWeight += weight;
  }

  if (currentPage.length > 0) {
    pages.push(currentPage.map((a) => ({ ...a })));
  }

  return pages;
}
