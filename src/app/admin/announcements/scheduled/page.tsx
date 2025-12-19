'use client';

import { useAuth } from '@/src/lib/hooks/use-auth';
import { SessionProvider } from 'next-auth/react';
import { Button } from '@components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUpcomingAnnouncements } from '@/src/lib/announcements/actions';
import { Suspense } from 'react';
import { Announcement } from '@/db/schema/announcements';

function ScheduledAnnouncementsContent() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnnouncements() {
      if (!isAuthenticated) return;

      try {
        setLoading(true);
        const upcoming = await getUpcomingAnnouncements();
        setAnnouncements(upcoming);
      } catch (err) {
        console.error('Failed to fetch scheduled announcements:', err);
        setError('Failed to load announcements. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchAnnouncements();
  }, [isAuthenticated]);

  if (authLoading) {
    return <div className="flex justify-center items-center min-h-[60vh]">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" asChild>
          <Link href="/admin">Back to Admin</Link>
        </Button>
        <h1 className="text-2xl font-bold ml-4">Scheduled Announcements</h1>
      </div>

      <div className="border border-border rounded-lg p-6">
        {loading ? (
          <div className="text-center py-4">Loading scheduled announcements...</div>
        ) : error ? (
          <div className="text-red-500 py-4">{error}</div>
        ) : announcements.length > 0 ? (
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="p-4 border border-border rounded-md">
                <h3 className="font-medium">{announcement.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Starts: {new Date(announcement.startDate).toLocaleDateString()}
                  {announcement.endDate &&
                    ` - Ends: ${new Date(announcement.endDate).toLocaleDateString()}`}
                </p>
                <p className="mt-2">{announcement.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-4">No scheduled announcements found.</p>
        )}
      </div>
    </div>
  );
}

export default function ScheduledAnnouncementsPage() {
  return (
    <SessionProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <ScheduledAnnouncementsContent />
      </Suspense>
    </SessionProvider>
  );
}
