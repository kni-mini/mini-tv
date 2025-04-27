import React from 'react';
import Announcement from '@/components/Announcement';
import type { AnnouncementProps } from '@/components/Announcement';
import {sampleAnnouncements} from '@/sampleData'


export default function AnnouncementsBoard() {
  return (
    <main>
      <h1>Dean Announcements</h1>
      <div>
        {sampleAnnouncements.map((a) => (
          <Announcement key={a.id} {...a} />
        ))}
      </div>
    </main>
  );
}