'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { usePosters } from '@/lib/hooks/use-posters';
import { Poster } from '@components/poster/poster';
import { CircularProgress } from '@material-ui/core';

export default function PosterPage() {
  const { id } = useParams();
  const { poster, loading, error } = usePosters(Number(id));

  if (loading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!poster) {
    return <p>Poster not found</p>;
  }

  const currentDate = new Date();
  if (
    poster.deletedAt ||
    currentDate < poster.startDate ||
    (poster.endDate && currentDate > poster.endDate)
  ) {
    return <p>Poster is not active</p>;
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Poster {...poster} />
    </div>
  );
}
