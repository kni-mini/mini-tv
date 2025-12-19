'use client';

import React from 'react';
import { Announcement } from '@/src/components/announcement/announcement';
import { useAnnouncements } from '@/src/lib/hooks/use-announcements';
import { CircularProgress } from '@material-ui/core';
import { toast } from 'sonner';

export default function AnnouncementsPage() {
  const { announcements, loading, error } = useAnnouncements();

  React.useEffect(() => {
    if (error) {
      toast.error('Error loading announcements');
    }
  }, [error]);

  if (loading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (announcements.length === 0) {
    return <p>No announcements available.</p>;
  }

  return (
    <div>
      {announcements.map((announcement) => (
        <Announcement key={announcement.id} {...announcement} />
      ))}
    </div>
  );
}
