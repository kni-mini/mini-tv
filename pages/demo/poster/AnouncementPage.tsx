// page: demo/poster/paginateAnnouncements.tsx
'use client';

import React from 'react';
import { useMemo, useState } from 'react';
import Announcement from '@/components/Announcement';
import { sampleAnnouncements } from '@/sampleData';
import { paginateAnnouncements } from './paginateAnnouncements';

export default function AnnouncementsBoard() {
  const pages = useMemo(() => paginateAnnouncements(sampleAnnouncements), [sampleAnnouncements]);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const currentPage = pages[currentPageIndex];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Dean Announcements</h1>
      <div className="h-[80vh] @container flex flex-col gap-4">
        {currentPage.map((a) => (
          <Announcement key={a.id} {...a} />
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-6">
        <button
          disabled={currentPageIndex === 0}
          onClick={() => setCurrentPageIndex((i) => Math.max(i - 1, 0))}
          className="p-2"
        >
          Previous
        </button>
        <button
          disabled={currentPageIndex >= pages.length - 1}
          onClick={() => setCurrentPageIndex((i) => Math.min(i + 1, pages.length - 1))}
          className="p-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}
