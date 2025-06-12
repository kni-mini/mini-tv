
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
        borderRadius: '0.5rem',
        boxShadow:
          '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
        overflow: 'hidden',
      }}
    >
      {/* ── CARD HEADER ── */}
      <div
        style={{
          background: 'linear-gradient(to right, #e0f2fe, white)',
          padding: '0.75rem 1rem',
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
            borderRadius: '0.375rem',
            padding: '0.25rem',
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
          }}
        >
          <img
            src={organizationLogo}
            alt={`${organizationName} logo`}
            style={{
              height: '2.5rem',      // 40px
              width: '2.5rem',       // 40px
              borderRadius: '0.375rem',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>

        {/* Organization name (increased from 1.5rem → 2rem) */}
        <h2
          style={{
            marginLeft: '1rem',          // same as ml-4
            fontSize: '3rem',            // was 1.5rem; now 2rem
            fontWeight: 600,
            color: '#1f2937',
            margin: 0,
          }}
        >
          {organizationName}
        </h2>
      </div>

      {/* ── BODY TEXT ── */}
      <div
        style={{
          padding: '1rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            color: '#374151',
            fontSize: '2rem',       // was 1rem; now 1.25rem
            lineHeight: '1.75rem',     // adjust to match larger font
            margin: 0,
          }}
        >
          {text}
        </p>
      </div>

      {/* ── MEDIA (if present) ── */}
      {media && (
        <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
          {mediaType === 'video' ? (
            <video
              src={media}
              autoPlay
              loop
              muted
              aria-label={mediaAlt}
              style={{
                width: '100%',
                borderRadius: '0.5rem',
                boxShadow:
                  '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
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
                borderRadius: '0.5rem',
                boxShadow:
                  '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
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
          backgroundColor: '#f9fafb',
          padding: '0.75rem 1.5rem',
          borderTop: '1px solid #e5e7eb',
          fontSize: '1rem',   // was 0.875rem; now 1rem
          color: '#6b7280',
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

