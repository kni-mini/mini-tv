import type { AnnouncementProps } from '@/components/Announcement';
import type { MediaProps } from '@/components/Media';

const now = new Date();

export const sampleMedia: MediaProps[] = [
  {
    id: 1,
    file: '/demo-media/integral-fest.png',
    name: 'Integral fest',
    createdAt: now,
    mediaType: 'image',
    alt: 'Integral Fest image',
  },
  {
    id: 2,
    file: '/demo-media/sample.mp4',
    name: 'Introduction Video',
    createdAt: now,
    mediaType: 'video',
    alt: 'Language classes video',
    autoPlay: true,
    caption:
      'Zapisy na lektoraty w semestrze letnim 2024/2025/ Registration for foreign language classes in the summer semester 2024/2025',
  },
  {
    id: 3,
    file: '/demo-media/library.gif',
    name: 'Library Course Announcement',
    createdAt: now,
    mediaType: 'gif',
    alt: 'Library animation',
  },
];

export const sampleAnnouncements: AnnouncementProps[] = [
  {
    type: 'announcement',
    id: 1,

    announcementName: 'Welcome to Mini TV!',
    organizationName: 'Mini Corp',
    organizationLogo:
      'https://static.vecteezy.com/system/resources/thumbnails/036/117/378/small_2x/educational-logo-design-free-vector.jpg',
    media:
      'https://cdn.dribbble.com/userupload/22692822/file/original-d031c15490e6296c7d9a492715072d5a.gif',
    mediaType: 'gif',
    mediaAlt: 'Globe',
    text: 'This is a demo announcement. Enjoy the new features and stay tuned for more updates!',
    startDate: new Date('2025-05-01T09:00:00Z'),
    createdAt: new Date('2025-05-01T08:00:00Z'),
  },
  {
    type: 'announcement',
    id: 3,

    announcementName: 'System Maintenance',
    organizationName: 'Mini Corp',
    organizationLogo:
      'https://static.vecteezy.com/system/resources/thumbnails/036/117/378/small_2x/educational-logo-design-free-vector.jpg',
    media:
      'https://themewinter.com/wp-content/uploads/2025/04/event-announcement-and-make-it-on-event-theme.webp',
    mediaType: 'image',
    mediaAlt: 'Maintenance Banner',
    text: 'We will be performing scheduled maintenance on May 25th. Service may be unavailable for a short period.',
    startDate: new Date('2025-05-01T09:00:00Z'),
    createdAt: new Date('2025-05-01T08:00:00Z'),
  },
];
