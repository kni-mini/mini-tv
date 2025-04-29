import Media, { MediaProps } from './Media';
import React from 'react';
import {sampleMedia} from '@/sampleData'

export type AnnouncementProps = {
  id: number;
  name: string;
  message: string;
  groupId?: number;
  userId: number;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  deletedAt?: Date;
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
  const now = new Date();

  if (now < startDate || (endDate && now > endDate)) {
    return null;
  }

  const media = sampleMedia.find(m => m.id === mediaId);
  const truncatedMessage = message.length > 300 ? message.slice(0, 300) + '…' : message;
  const hasMedia = Boolean(media);

  return (
    <div
      className={`relative bg-white rounded-xl p-4 flex flex-col gap-4 ${
      hasMedia ? 'h-[30cqh]' : 'h-[15cqh]'}`}>
      <p className="text-gray-800 text-sm flex-1">{truncatedMessage}</p>
      {media && (
        <div className="flex-1 overflow-hidden flex items-center justify-center">
          <Media {...media} />
        </div>
      )}
    </div>
  );
}

