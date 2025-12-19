'use client';

import React from 'react';
import { Card, CardContent } from '@mui/material';
import styles from '@components/poster/poster.module.css';

interface PosterProps {
  media: string;
  mediaType: 'image' | 'video' | 'gif';
  mediaAlt?: string;
}

export function Poster({ media, mediaType, mediaAlt }: PosterProps) {
  return (
    <Card className={styles.posterWrapper}>
      <CardContent>
        {mediaType === 'video' && (
          <video src={media} autoPlay loop controls className={styles.posterMedia} />
        )}
        {(mediaType === 'image' || mediaType === 'gif') && (
          <img src={media} alt={mediaAlt || 'Poster content'} className={styles.posterMedia} />
        )}
        {!['image', 'video', 'gif'].includes(mediaType) && (
          <p>Unsupported media type {mediaType}</p>
        )}
      </CardContent>
    </Card>
  );
}
