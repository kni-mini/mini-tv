import React from 'react';
import Announcement from '@/components/Announcement';
import type { AnnouncementProps } from '@/components/Announcement';
import {sampleAnnouncements} from '@/sampleData'


export default function AnnouncementsBoard() {
  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Dean Announcements</h1>
      <div className="flex flex-col gap-6">
        {sampleAnnouncements.map((a) => (
          <Announcement key={a.id} {...a} />
        ))}
      </div>
    </main>
  );
}