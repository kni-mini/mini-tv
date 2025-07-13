'use client';

import { useAuth } from '@/lib/hooks/use-auth';
import { SessionProvider } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';
import { PosterEditForm } from '@/components/forms/poster-edit-form';
import { useParams } from 'next/navigation';

function EditPosterContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const params = useParams();
  const posterId = parseInt(params.id as string);

  if (isLoading) {
    return <div className="loading-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (isNaN(posterId)) {
    return <div className="text-center py-4 error-text">Invalid poster ID</div>;
  }

  return (
    <div className="admin-container">
      <div className="flex items-center mb-6">
        <Button variant="outline" asChild>
          <Link href="/admin/scheduled">Back to All Content</Link>
        </Button>
        <h1 className="text-2xl font-bold ml-4 admin-header">Edit Poster</h1>
      </div>
      <Suspense fallback={<div className="loading-text">Loading poster...</div>}>
        <PosterEditForm posterId={posterId} />
      </Suspense>
    </div>
  );
}

export default function EditPosterPage() {
  return (
    <SessionProvider>
      <EditPosterContent />
    </SessionProvider>
  );
}
