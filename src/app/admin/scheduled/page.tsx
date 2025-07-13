'use client';

import { useAuth } from '@/lib/hooks/use-auth';
import { SessionProvider } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUpcomingAnnouncements, getActiveAnnouncements } from '@/lib/announcements/actions';
import { getUpcomingPosters, getActivePosters } from '@/lib/posters/actions';
import { Suspense } from 'react';
import { Announcement } from '@/lib/db/schema/announcements';
import { Poster } from '@/lib/db/schema/posters';

// Helper function to format relative time
function getRelativeTimeString(date: Date): string {
  const now = new Date();
  const diffInMs = date.getTime() - now.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 0) {
    const pastDays = Math.abs(diffInDays);
    if (pastDays === 0) {
      return 'Today';
    } else if (pastDays === 1) {
      return 'Yesterday';
    } else if (pastDays < 7) {
      return `${pastDays} days ago`;
    } else if (pastDays < 30) {
      const weeks = Math.ceil(pastDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
      const months = Math.ceil(pastDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }
  } else if (diffInDays === 0) {
    return 'Today';
  } else if (diffInDays === 1) {
    return 'Tomorrow';
  } else if (diffInDays < 7) {
    return `In ${diffInDays} days`;
  } else if (diffInDays < 30) {
    const weeks = Math.ceil(diffInDays / 7);
    return `In ${weeks} week${weeks > 1 ? 's' : ''}`;
  } else {
    const months = Math.ceil(diffInDays / 30);
    return `In ${months} month${months > 1 ? 's' : ''}`;
  }
}

// Combined type for content items
interface ContentItem {
  id: number;
  name: string;
  type: 'announcement' | 'poster';
  status: 'active' | 'upcoming';
  startDate: Date;
  endDate?: Date | null;
  message?: string; // Only for announcements
}

function ScheduledContentMain() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'announcement' | 'poster'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'upcoming'>('all');

  useEffect(() => {
    async function fetchAllContent() {
      if (!isAuthenticated) return;

      try {
        setLoading(true);
        const [upcomingAnnouncements, upcomingPosters, activeAnnouncements, activePosters] =
          await Promise.all([
            getUpcomingAnnouncements(),
            getUpcomingPosters(),
            getActiveAnnouncements(),
            getActivePosters(),
          ]);

        // Transform upcoming announcements
        const upcomingAnnouncementItems: ContentItem[] = upcomingAnnouncements.map(
          (announcement: Announcement) => ({
            id: announcement.id,
            name: announcement.name,
            type: 'announcement' as const,
            status: 'upcoming' as const,
            startDate: announcement.startDate,
            endDate: announcement.endDate,
            message: announcement.message,
          })
        );

        // Transform upcoming posters
        const upcomingPosterItems: ContentItem[] = upcomingPosters.map((poster: Poster) => ({
          id: poster.id,
          name: poster.name,
          type: 'poster' as const,
          status: 'upcoming' as const,
          startDate: poster.startDate,
          endDate: poster.endDate,
        }));

        // Transform active announcements
        const activeAnnouncementItems: ContentItem[] = activeAnnouncements.map(
          (announcement: Announcement) => ({
            id: announcement.id,
            name: announcement.name,
            type: 'announcement' as const,
            status: 'active' as const,
            startDate: announcement.startDate,
            endDate: announcement.endDate,
            message: announcement.message,
          })
        );

        // Transform active posters
        const activePosterItems: ContentItem[] = activePosters.map((poster: Poster) => ({
          id: poster.id,
          name: poster.name,
          type: 'poster' as const,
          status: 'active' as const,
          startDate: poster.startDate,
          endDate: poster.endDate,
        }));

        // Combine all items and sort by start date (active first, then upcoming)
        const allItems = [
          ...activeAnnouncementItems,
          ...activePosterItems,
          ...upcomingAnnouncementItems,
          ...upcomingPosterItems,
        ].sort((a, b) => {
          // First sort by status (active before upcoming)
          if (a.status !== b.status) {
            return a.status === 'active' ? -1 : 1;
          }
          // Then sort by start date
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        });

        setContentItems(allItems);
        setFilteredItems(allItems);
      } catch (err) {
        console.error('Failed to fetch content:', err);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchAllContent();
  }, [isAuthenticated]);

  // Filter items when filters change
  useEffect(() => {
    let filtered = contentItems;

    // Filter by type
    if (filter !== 'all') {
      filtered = filtered.filter((item) => item.type === filter);
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    setFilteredItems(filtered);
  }, [filter, statusFilter, contentItems]);

  if (authLoading) {
    return <div className="flex justify-center items-center min-h-[60vh]">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="outline" asChild>
            <Link href="/admin">Back to Admin</Link>
          </Button>
          <h1 className="text-2xl font-bold ml-4">All Content</h1>
        </div>

        {!loading && !error && contentItems.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {/* Type filters */}
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All Types ({contentItems.length})
            </Button>
            <Button
              variant={filter === 'announcement' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('announcement')}
            >
              Announcements ({contentItems.filter((item) => item.type === 'announcement').length})
            </Button>
            <Button
              variant={filter === 'poster' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('poster')}
            >
              Posters ({contentItems.filter((item) => item.type === 'poster').length})
            </Button>

            {/* Status filters */}
            <div className="w-px h-6 bg-border self-center mx-1" />
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('all')}
            >
              All Status
            </Button>
            <Button
              variant={statusFilter === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('active')}
            >
              Active ({contentItems.filter((item) => item.status === 'active').length})
            </Button>
            <Button
              variant={statusFilter === 'upcoming' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('upcoming')}
            >
              Upcoming ({contentItems.filter((item) => item.status === 'upcoming').length})
            </Button>
          </div>
        )}
      </div>

      <div className="border border-border rounded-lg p-6">
        {loading ? (
          <div className="text-center py-4">Loading content...</div>
        ) : error ? (
          <div className="text-red-500 py-4">{error}</div>
        ) : filteredItems.length > 0 ? (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div key={`${item.type}-${item.id}`} className="p-4 border border-border rounded-md">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{item.name}</h3>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                          item.type === 'announcement'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        }`}
                      >
                        <span>{item.type === 'announcement' ? '📢' : '🖼️'}</span>
                        {item.type === 'announcement' ? 'Announcement' : 'Poster'}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                          item.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                        }`}
                      >
                        <span>{item.status === 'active' ? '🟢' : '🔵'}</span>
                        {item.status === 'active' ? 'Currently Active' : 'Upcoming'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium">
                        {getRelativeTimeString(new Date(item.startDate))}
                      </span>
                      {' • '}
                      {item.status === 'active' ? 'Started' : 'Starts'}:{' '}
                      {new Date(item.startDate).toLocaleDateString()} at{' '}
                      {new Date(item.startDate).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      {item.endDate &&
                        ` - Ends: ${new Date(item.endDate).toLocaleDateString()} at ${new Date(
                          item.endDate
                        ).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}`}
                    </p>
                    {item.message && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 overflow-hidden">
                        <span className="block max-h-10 overflow-hidden text-ellipsis">
                          {item.message.length > 100
                            ? `${item.message.substring(0, 100)}...`
                            : item.message}
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline" asChild>
                      <Link
                        href={`/admin/${item.type === 'announcement' ? 'announcements' : 'posters'}/edit/${item.id}`}
                      >
                        Edit
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              {filter === 'all' && statusFilter === 'all'
                ? 'No content found.'
                : `No ${statusFilter !== 'all' ? statusFilter + ' ' : ''}${filter !== 'all' ? filter + 's' : 'content'} found.`}
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link href="/admin/announcements/new">Create Announcement</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/posters/new">Create Poster</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AllContentPage() {
  return (
    <SessionProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <ScheduledContentMain />
      </Suspense>
    </SessionProvider>
  );
}
