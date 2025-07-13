'use client';

import { useAuth } from '@/lib/hooks/use-auth';
import { SessionProvider } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUpcomingPosters } from '@/lib/posters/actions';
import { Suspense } from 'react';
import { Poster } from '@/lib/db/schema/posters';

function ScheduledPostersContent() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosters() {
      if (!isAuthenticated) return;

      try {
        setLoading(true);
        const upcoming = await getUpcomingPosters();
        setPosters(upcoming);
      } catch (err) {
        console.error('Failed to fetch scheduled posters:', err);
        setError('Failed to load posters. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchPosters();
  }, [isAuthenticated]);

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-foreground">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto p-6 bg-background text-foreground">
      <div className="flex items-center mb-6">
        <Button variant="outline" asChild>
          <Link href="/admin">Back to Admin</Link>
        </Button>
        <h1 className="text-2xl font-bold ml-4 text-foreground">Scheduled Posters</h1>
      </div>

      <div className="border border-border rounded-lg p-6 bg-background dark:bg-gray-800">
        {loading ? (
          <div className="text-center py-4 text-foreground">Loading scheduled posters...</div>
        ) : error ? (
          <div className="text-red-500 dark:text-red-400 py-4">{error}</div>
        ) : posters.length > 0 ? (
          <div className="space-y-4">
            {posters.map((poster) => (
              <div
                key={poster.id}
                className="p-4 border border-border rounded-md bg-background dark:bg-gray-700"
              >
                <h3 className="font-medium text-foreground">{poster.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Starts: {new Date(poster.startDate).toLocaleDateString()}
                  {poster.endDate && ` - Ends: ${new Date(poster.endDate).toLocaleDateString()}`}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-4 text-muted-foreground">No scheduled posters found.</p>
        )}
      </div>
    </div>
  );
}

export default function ScheduledPostersPage() {
  return (
    <SessionProvider>
      <Suspense fallback={<div className="text-foreground">Loading...</div>}>
        <ScheduledPostersContent />
      </Suspense>
    </SessionProvider>
  );
}
