'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/use-auth';
import { SessionProvider } from 'next-auth/react';
import { Suspense } from 'react';

function AdminContent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[60vh]">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // This will not show as useAuth will redirect
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-border rounded-lg p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Announcement Management</h2>
          <p className="mb-4 flex-grow">
            Create and manage announcements for the platform. You can optionally attach media files.
          </p>
          <Button asChild className="mt-auto self-start">
            <Link href="/admin/announcements/new">Add New Announcement</Link>
          </Button>
        </div>

        <div className="border border-border rounded-lg p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Poster Management</h2>
          <p className="mb-4 flex-grow">
            Create and manage posters with media files for the platform.
          </p>
          <Button asChild className="mt-auto self-start">
            <Link href="/admin/posters/new">Add New Poster</Link>
          </Button>
        </div>

        <div className="border border-border rounded-lg p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">All Content</h2>
          <div className="space-y-4">
            <p>
              View and manage all content including currently active and upcoming announcements and
              posters.
            </p>
            <Button asChild variant="outline">
              <Link href="/admin/scheduled">View All Content</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <SessionProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <AdminContent />
      </Suspense>
    </SessionProvider>
  );
}
