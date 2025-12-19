'use client';

import { useAuth } from '@/src/lib/hooks/use-auth';
import { SessionProvider } from 'next-auth/react';
import { Button } from '@components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';

function AddAnnouncementContent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
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
        <h1 className="text-2xl font-bold ml-4">Add New Announcement</h1>
      </div>

      <div className="border border-border rounded-lg p-6">
        <p className="mb-4">Use the form below to create a new announcement.</p>
        {/* In a real implementation, you would add a form here */}
        <p className="text-muted-foreground">Announcement form would be implemented here.</p>
      </div>
    </div>
  );
}

export default function AddAnnouncementPage() {
  return (
    <SessionProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <AddAnnouncementContent />
      </Suspense>
    </SessionProvider>
  );
}
