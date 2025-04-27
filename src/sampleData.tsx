import React from 'react';
import Announcement from '@/components/Announcement';
import type { AnnouncementProps } from '@/components/Announcement';
import Media, { MediaProps } from '@/components//Media';
import { Timestamp } from 'next/dist/server/lib/cache-handlers/types';

export const sampleMedia: MediaProps[] =   [
  {
    id: 1,
    file: '/demo-media/integral-fest.jpg',
    name: 'Integral fest',
    createdAt: new Date() as unknown as Timestamp,
    mediaType: 'image',
    alt: 'Integral Fest image',
  },
  {
    id: 2,
    file: '/demo-media/sample.mp4',
    name: 'Introduction Video',
    createdAt: new Date() as unknown as Timestamp,
    mediaType: 'video',
    alt: 'Language classes video',
    caption: 'Zapisy na lektoraty w semestrze letnim 2024/2025/ Registration for foreign language classes in the summer semester 2024/2025',
  },
  {
    id: 3,
    file: '/demo-media/library.gif',
    name: 'Library Course Announcement',
    createdAt: new Date() as unknown as Timestamp,
    mediaType: 'gif',
    alt: 'Library animation',
  },
];


export const sampleAnnouncements: AnnouncementProps[] = [
  {
    id: 1,
    name: 'Dean Office Hours',
    message: '08.05.2025 from 12:00 godziny dziekańskie z okazji Całkonaliów / hours free from classes due to Integral Fest. 08.05.2025 from 12:00 godziny dziekańskie z okazji Całkonaliów / hours free from classes due to Integral Fest. 08.05.2025 from 12:00 godziny dziekańskie z okazji Całkonaliów / hours free from classes due to Integral Fest. 08.05.2025 from 12:00 godziny dziekańskie z okazji Całkonaliów / hours free from classes due to Integral Fest. 08.05.2025 from 12:00 godziny dziekańskie z okazji Całkonaliów / hours free from classes due to Integral Fest.',
    groupId: 1,
    userId: 101,
    startDate: new Date() as unknown as Timestamp,
    endDate: new Date() as unknown as Timestamp,
    createdAt: new Date() as unknown as Timestamp,
    mediaId: 1,
  },
  {
    id: 2,
    name: 'Language classes',
    message: 'Zapisy na lektoraty w semestrze letnim 2024/2025/ Registration for foreign language classes in the summer semester 2024/2025Zapisy na lektoraty w semestrze letnim 2024/2025/ Registration for foreign language classes in the summer semester 2024/2025Zapisy na lektoraty w semestrze letnim 2024/2025/ Registration for foreign language classes in the summer semester 2024/2025Zapisy na lektoraty w semestrze letnim 2024/2025/ Registration for foreign language classes in the summer semester 2024/2025',
    groupId: 2,
    userId: 102,
    startDate: new Date() as unknown as Timestamp,
    endDate: new Date() as unknown as Timestamp,
    createdAt: new Date() as unknown as Timestamp,
    mediaId: 2, 
  },
  {
    id: 3,
    name: 'Library Course',
    message: 'ekurs Przysposobienie biblioteczne/ Library Training e-course',
    groupId: 3,
    userId: 103,
    startDate: new Date() as unknown as Timestamp,
    endDate: new Date() as unknown as Timestamp,
    createdAt: new Date() as unknown as Timestamp,
    mediaId: 3, 
  },
];