// @/components/Announcement.tsx
import React from 'react';

export interface AnnouncementProps {
  type: 'announcement';
  id: number;
  announcementName: string;      // (Optional title—unused here)
  organizationName: string;      // “Mini Corp” or similar
  organizationLogo: string;      // logo URL
  media?: string;                // image/video/gif URL
  mediaType?: 'image' | 'video' | 'gif';
  mediaAlt?: string;             // alt text
  text: string;                  // body copy
  startDate: Date;
  createdAt: Date;
}

const Announcement: React.FC<AnnouncementProps> = ({
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
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem', // same as rounded-lg
        boxShadow:
          '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)', // shadow-lg
        overflow: 'hidden', // ensure children don’t overflow rounded corners
      }}
    >
      {/* ── CARD HEADER ── */}
      <div
        style={{
          background: 'linear-gradient(to right, #e0f2fe, white)', // from-sky-100 to white
          padding: '0.75rem 1rem',   // py-3 (0.75rem), px-4 (1rem)
          display: 'flex',
          alignItems: 'center',
          borderTopLeftRadius: '0.5rem',
          borderTopRightRadius: '0.5rem',
        }}
      >
        {/* Logo container */}
        <div
          style={{
            flexShrink: 0,
            backgroundColor: 'white',
            borderRadius: '0.375rem', // rounded-lg (but smaller)
            padding: '0.25rem',       // p-1
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)', // shadow-sm
          }}
        >
          <img
            src={organizationLogo}
            alt={`${organizationName} logo`}
            style={{
              height: '2.5rem',    // h-10
              width: '2.5rem',     // w-10
              borderRadius: '0.375rem', // rounded-md
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>

        {/* Organization name */}
        <h2
          style={{
            marginLeft: '1rem',      // ml-4
            fontSize: '1.5rem',      // text-2xl
            fontWeight: 600,         // font-semibold
            color: '#1f2937',        // text-gray-800
            margin: 0,               // reset default margins on h2
          }}
        >
          {organizationName}
        </h2>
      </div>

      {/* ── BODY TEXT ── */}
      <div
        style={{
          padding: '1rem 1.5rem', // py-4 (1rem), px-6 (1.5rem)
          textAlign: 'center',
        }}
      >
        <p
          style={{
            color: '#374151',       // text-gray-700
            fontSize: '1rem',       // text-base
            lineHeight: '1.625rem', // leading-relaxed (~1.625)
            margin: 0,              // reset default p margin
          }}
        >
          {text}
        </p>
      </div>

      {/* ── MEDIA (if present) ── */}
      {media && (
        <div
          style={{
            padding: '0 1.5rem 1.5rem 1.5rem', // px-6 pb-6
          }}
        >
          {mediaType === 'video' ? (
            <video
              src={media}
              autoPlay
              loop
              muted
              aria-label={mediaAlt}
              style={{
                width: '100%',
                borderRadius: '0.5rem', // rounded-lg
                boxShadow:
                  '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)', // shadow-md
                objectFit: 'cover',
                display: 'block',
              }}
            />
          ) : (
            <img
              src={media}
              alt={mediaAlt}
              style={{
                width: '100%',
                borderRadius: '0.5rem', // rounded-lg
                boxShadow:
                  '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)', // shadow-md
                objectFit: 'cover',
                display: 'block',
              }}
            />
          )}
        </div>
      )}

      {/* ── FOOTER (dates) ── */}
      <div
        style={{
          backgroundColor: '#f9fafb',      // bg-gray-50
          padding: '0.75rem 1.5rem',       // py-3 (0.75rem), px-6 (1.5rem)
          borderTop: '1px solid #e5e7eb',  // border-t gray-200
          fontSize: '0.875rem',            // text-sm
          color: '#6b7280',                // text-gray-500
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ margin: 0 }}>
          <strong>Published:</strong>{' '}
          {createdAt.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          })}
        </span>
        <span style={{ margin: 0 }}>
          <strong>Effective:</strong>{' '}
          {startDate.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
};

export default Announcement;
