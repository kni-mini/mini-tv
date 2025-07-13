'use client';

import { useAuth } from '@/lib/hooks/use-auth';
import { SessionProvider } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';
import { AnnouncementEditForm } from '@/components/forms/announcement-edit-form';
import { useParams } from 'next/navigation';

function EditAnnouncementContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const params = useParams();
  const announcementId = parseInt(params.id as string);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-foreground">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (isNaN(announcementId)) {
    return (
      <div className="text-center py-4 text-red-500 dark:text-red-400">Invalid announcement ID</div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-background text-foreground">
      <div className="flex items-center mb-6">
        <Button variant="outline" asChild>
          <Link href="/admin/scheduled">Back to All Content</Link>
        </Button>
        <h1 className="text-2xl font-bold ml-4 text-foreground">Edit Announcement</h1>
      </div>

      <div className="border border-border rounded-lg p-6 bg-background dark:bg-gray-800">
        <AnnouncementEditForm announcementId={announcementId} />
      </div>
    </div>
  );
}

export default function EditAnnouncementPage() {
  return (
    <SessionProvider>
      <Suspense fallback={<div className="text-foreground">Loading...</div>}>
        <EditAnnouncementContent />
      </Suspense>
    </SessionProvider>
  );
}
