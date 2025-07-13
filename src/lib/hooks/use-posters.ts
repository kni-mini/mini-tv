'use client';

import { useEffect, useState } from 'react';
import { getPosterById } from '@/lib/posters/actions';
import { getMediaById } from '@/lib/media/actions';

interface PosterWithMedia {
  id: number;
  media: string;
  mediaType: 'image' | 'video' | 'gif';
  mediaAlt?: string;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  deletedAt?: Date;
}

export function usePosters(id: number) {
  const [poster, setPoster] = useState<PosterWithMedia | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPoster() {
      try {
        setLoading(true);
        setError(null);

        const posterData = await getPosterById(id);

        if (!posterData) {
          setError('Poster not found');
          setPoster(null);
          return;
        }

        const transformedPoster: PosterWithMedia = {
          id: posterData.id,
          media: '',
          mediaType: 'image',
          startDate: posterData.startDate,
          endDate: posterData.endDate || undefined,
          createdAt: posterData.createdAt,
          deletedAt: posterData.deletedAt || undefined,
        };

        const media = posterData.mediaId ? await getMediaById(posterData.mediaId) : null;

        if (media) {
          transformedPoster.media = media.file;
          transformedPoster.mediaType = media.type;
          transformedPoster.mediaAlt = media.name || undefined;
        }

        setPoster(transformedPoster);
      } catch (err) {
        setError(`Failed to fetch poster: ${(err as Error).message}`);
        setPoster(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPoster();
  }, [id]);

  return { poster, loading, error };
}
