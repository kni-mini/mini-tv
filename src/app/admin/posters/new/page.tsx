'use client';

import { useAuth } from '@/lib/hooks/use-auth';
import { SessionProvider } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';
import { PosterForm } from '@/components/forms/poster-form';

function AddPosterContent() {
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
        <h1 className="text-2xl font-bold ml-4">Add New Poster</h1>
      </div>

      <div className="border border-border rounded-lg p-6">
        <PosterForm />
      </div>
    </div>
  );
}

export default function AddPosterPage() {
  return (
    <SessionProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <AddPosterContent />
      </Suspense>
    </SessionProvider>
  );
}
