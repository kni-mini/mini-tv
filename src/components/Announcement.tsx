import { Timestamp } from 'next/dist/server/lib/cache-handlers/types';
import Media, { MediaProps } from './Media';
import React from 'react';
import {sampleMedia} from '@/sampleData'

export type AnnouncementProps = {
  id: number;
  name: string;
  message: string;
  groupId?: number;
  userId: number;
  startDate: Timestamp;
  endDate?: Timestamp;
  createdAt: Timestamp;
  deletedAt?: Timestamp;
  mediaId?: number;
}

export default function Announcement({
  name,
  message,
  groupId,
  userId,
  startDate,
  endDate,
  createdAt,
  deletedAt,
  mediaId,
}: AnnouncementProps) {
  const media = sampleMedia.find(m => m.id === mediaId);
  const truncatedMessage = message.length > 300 ? message.slice(0, 300) + '…' : message;
  const hasMedia = Boolean(media);

  return (
    <div
      className={`bg-white shadow-lg rounded-xl p-4 flex flex-col gap-4 ${
      hasMedia ? 'min-h-[30vh]' : 'min-h-[15vh]'}`}
      >
      <p className="text-gray-700 text-base">{truncatedMessage}</p>
      {media && (
        <Media
          id={media.id}
          file={media.file}
          name={media.name}
          createdAt={media.createdAt}
          deleteAt={media.deleteAt}
          alt={media.alt}
          caption={media.caption}
          mediaType={media.mediaType}
        />
      )}
    </div>
  );
}

