import Media, { MediaProps } from '@/Components/Media';
import React from 'react';
import {sampleMedia} from '@/sampleData'
import {ANNOUNCEMENT_MAX_MESSAGE_LENGTH} from '@/app/constants'

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

  if (now < startDate || (endDate && now > endDate) || (deletedAt && now > deletedAt)) {
    return null;
  }

  const media = sampleMedia.find(m => m.id === mediaId);
  const truncatedMessage = (message.length > ANNOUNCEMENT_MAX_MESSAGE_LENGTH) ? (message.slice(0, ANNOUNCEMENT_MAX_MESSAGE_LENGTH) + '...') : message;
  const hasMedia = Boolean(media);

  return (
    <div
      className={`relative bg-white rounded-xl p-4 flex flex-row gap-4 ${
      hasMedia ? 'max-h-[30cqh] min-h-[25cqh]' : 'max-h-[20cqh] min-h-[15cqh]'}`}>
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900">{name}</h2>
          <p className="text-gray-800" style={{ fontSize: 'clamp(0.65rem, 2vw, 1.125rem)' }}>{truncatedMessage}</p>
        </div>
      {media && (
        <figure className="relative object-contain aspect-video max-h-full max-w-[50%] rounded-lg">
        <Media {...media}/>
        </figure>)}
    </div>
  );
}

