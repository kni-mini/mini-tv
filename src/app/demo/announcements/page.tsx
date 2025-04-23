import Announcement from '@/components/Announcement';
import type { AnnouncementProps } from '@/components/Announcement';
import styles from '@/components/Announcement.module.css';

const sampleAnnouncements: AnnouncementProps[] = [
    {
      id: '1',
      message: 'ekurs Przysposobienie biblioteczne/ Library Training e-course',
      mediaSrc: '/demo-media/library.gif',
      mediaType: 'gif',
      alt: 'Library animation ',
    },
    {
      id: '2',
      message: '08.05.2025 from 12:00 godziny dziekańskie z okazji Całkonaliów / hours free from classes due to Integral Fest.',
      mediaSrc: '/demo-media/integral-fest.png',
      mediaType: 'image',
      alt: 'Integral Fest image',
    },
    {
        id: '3',
        message: 'Zapisy na lektoraty w semestrze letnim 2024/2025/ Registration for foreign language classes in the summer semester 2024/2025',
        mediaSrc: '/demo-media/sample.mp4',
        mediaType: 'video',
        alt: 'Language classes video',
        caption: 'Captions of language classes video',
      },
  ];

export default function AnnouncementsBoard() {
  return (
    <main className={styles.container}>
      <h1 className={styles.header}>Dean Announcements</h1>
      <div className={styles.grid}>
        {sampleAnnouncements.map((a) => (
          <Announcement key={a.id} {...a} />
        ))}
      </div>
    </main>
  );
}