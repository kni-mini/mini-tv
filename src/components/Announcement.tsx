// @/components/Announcement.tsx
import React from 'react';

export interface AnnouncementProps {
  type: 'announcement';
  id: number;
  announcementName: string;
  organizationName: string;
  organizationLogo: string;      // URL to logo image
  media?: string;                // URL to an image/video/gif (optional)
  mediaType?: 'image' | 'video' | 'gif';
  mediaAlt?: string;             // alt text for image/gif (optional)
  text: string;                  // announcement body
  startDate: Date;
  createdAt: Date;
}

const Announcement: React.FC<AnnouncementProps> = ({
  announcementName,
  organizationName,
  organizationLogo,
  media,
  mediaType,
  mediaAlt,
  text,
  startDate,
  createdAt,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* ── HEADER: logo + title + organization ── */}
      <div className="flex items-center px-4 py-3 border-b">
        <img
          src={organizationLogo}
          alt={`${organizationName} logo`}
          className="h-10 w-10 mr-3 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-gray-800">
            {announcementName}
          </span>
          <span className="text-sm text-gray-500">{organizationName}</span>
        </div>
      </div>

      {/* ── MEDIA (if any) ── */}
      {media && mediaType === 'image' && (
        <img
          src={media}
          alt={mediaAlt}
          className="w-full h-48 object-cover"
        />
      )}

      {media && mediaType === 'gif' && (
        <img
          src={media}
          alt={mediaAlt}
          className="w-full h-48 object-cover"
        />
      )}

      {media && mediaType === 'video' && (
        <video
          src={media}
          autoPlay
          loop
          muted
          className="w-full h-48 object-cover"
          aria-label={mediaAlt}
        />
      )}

      {/* ── BODY: text ── */}
      <div className="px-4 py-3 flex-1 flex flex-col justify-between">
        <p className="text-gray-700 text-base mb-4 leading-relaxed">
          {text}
        </p>

        {/* ── FOOTER: dates ── */}
        <div className="flex justify-between text-sm text-gray-500">
          <span>
            <strong>Published:</strong>{' '}
            {createdAt.toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
            })}
          </span>
          <span>
            <strong>Effective:</strong>{' '}
            {startDate.toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
