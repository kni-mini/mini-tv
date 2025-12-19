'use client';

import React from 'react';
import { Card, CardContent } from '@mui/material';
import clsx from 'clsx';
import styles from '@components/announcement/announcement.module.css';

interface AnnouncementProps {
  id: number;
  announcementName: string;
  organizationName: string;
  organizationLogo?: string;
  media?: string;
  mediaType?: 'image' | 'video' | 'gif';
  mediaAlt?: string;
  text: string;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  deletedAt?: Date;
}

const MAX_TEXT_LENGTH = 300;

export function Announcement({
  text,
  organizationName,
  organizationLogo,
  media,
  mediaType,
  mediaAlt,
  startDate,
  endDate,
  deletedAt,
}: AnnouncementProps) {
  const currentDate = new Date();

  if (deletedAt || currentDate < startDate || (endDate && currentDate > endDate)) {
    return null;
  }

  const truncatedText =
    text.length > MAX_TEXT_LENGTH ? text.slice(0, MAX_TEXT_LENGTH) + '...' : text;

  const mediaSrc = media ? media : null;

  return (
    <Card className={clsx(styles.root, styles.card)}>
      {/* Header */}
      <div className={styles.header}>
        {organizationLogo && (
          <img alt={`${organizationName} logo`} src={organizationLogo} className={styles.avatar} />
        )}
        <div className={styles.title}>{organizationName}</div>
      </div>

      {/* Content */}
      <CardContent className={styles.content}>
        <p className={styles.text}>{truncatedText}</p>
        {mediaSrc && (
          <div className={styles.mediaWrapper}>
            {mediaType === 'video' && (
              <video src={mediaSrc} autoPlay loop controls className={styles.media} />
            )}
            {(mediaType === 'image' || mediaType === 'gif') && (
              <img src={mediaSrc} alt={mediaAlt || 'Media content'} className={styles.media} />
            )}
            {!['image', 'video', 'gif'].includes(mediaType || '') && (
              <p>Unsupported media type {mediaType}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
