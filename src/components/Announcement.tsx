import React from 'react';
import Image from 'next/image';
import Media from '@/components/Media';

export interface AnnouncementProps {
  // Core properties
  id?: number;
  title?: string;
  body?: string;
  organizationName?: string;
  organizationLogo?: string;

  // Media properties
  mediaSrc?: string;
  mediaType?: 'image' | 'gif' | 'video';
  mediaAlt?: string;
  mediaId?: number;

  // Date properties
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
  deletedAt?: Date;

  // Layout variant
  variant?: 'card' | 'club';

  // Legacy support (will be mapped to new props)
  name?: string;
  message?: string;
  clubName?: string;
  logoSrc?: string;
  text?: string;
  userId?: number;
  groupId?: number;
}

const maxLen = 300;

const Announcement = (props: AnnouncementProps) => {
  // Map legacy props to new unified props for backward compatibility
  const title = props.title || props.name || '';
  const body = props.body || props.message || props.text || '';
  const organizationName = props.organizationName || props.clubName || '';
  const organizationLogo =
    props.organizationLogo || props.logoSrc || '/student_club_logos/shitemoji.png';
  const { mediaSrc, mediaType, mediaAlt, variant = 'club', createdAt, mediaId } = props;

  // TODO: Implement proper client-side date filtering with useEffect
  const shouldDisplay = true;

  if (!shouldDisplay) {
    return null;
  }

  // Truncate body text
  const truncatedBody = body.length > maxLen ? body.slice(0, maxLen) + '...' : body;

  // Club/Card variant (modern layout)
  if (variant === 'club') {
    return (
      <div className="w-full max-w-4xl min-h-[200px] grid grid-rows-[60px_80px_1fr] bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden">
        {/* Row 1: Organization Logo */}
        <div className="flex items-center gap-2 px-8 py-4 my-4 bg-white dark:bg-gray-700">
          <Image
            src={organizationLogo}
            width={32}
            height={32}
            className="rounded-full object-contain"
            alt={`${organizationName} logo`}
          />
          <p className="text-gray-900 dark:text-gray-100">{organizationName}</p>
        </div>

        {/* Row 2: Title */}
        <div className="flex items-center px-8 py-4">
          <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 text-left">
            {title}
          </h2>
        </div>

        {/* Row 3: Body */}
        <div className="px-8 py-6 text-gray-700 dark:text-gray-300 text-left overflow-auto">
          <p>{truncatedBody}</p>
        </div>

        {/* Optional Media */}
        {mediaSrc && (
          <>
            {(mediaType === 'image' || mediaType === 'gif') && (
              <div className="relative w-full max-w-md h-[250px] mx-auto mt-4">
                <Image
                  src={mediaSrc}
                  alt={mediaAlt || 'Announcement Media'}
                  fill
                  unoptimized={mediaType === 'gif'}
                  className="object-contain w-full h-auto rounded-lg"
                />
              </div>
            )}

            {mediaType === 'video' && (
              <div className="mt-4 rounded-lg overflow-hidden">
                <video controls className="w-full h-auto rounded-lg">
                  <source src={mediaSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </>
        )}

        {/* Legacy Media support using Media component */}
        {!mediaSrc && mediaId && (
          <div className="mt-4 rounded-lg overflow-hidden">
            <Media
              id={mediaId}
              file={mediaSrc || ''}
              mediaType={mediaType || 'image'}
              alt={mediaAlt}
              createdAt={createdAt || new Date()}
            />
          </div>
        )}
      </div>
    );
  }

  // Card variant (compact layout)
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl p-4 flex flex-row gap-4 shadow-lg min-h-[15cqh] max-h-[30cqh]">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <p
          className="text-gray-800 dark:text-gray-300"
          style={{ fontSize: 'clamp(0.65rem, 2vw, 1.125rem)' }}
        >
          {truncatedBody}
        </p>
        {organizationName && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">— {organizationName}</p>
        )}
      </div>

      {mediaSrc && (
        <figure className="relative object-contain aspect-video max-h-full max-w-[50%] rounded-lg">
          {mediaType === 'video' ? (
            <video controls className="w-full h-full object-contain rounded-lg">
              <source src={mediaSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={mediaSrc}
              alt={mediaAlt || 'Announcement image'}
              fill
              unoptimized={mediaType === 'gif'}
              className="object-contain rounded-lg"
            />
          )}
        </figure>
      )}
    </div>
  );
};

export default Announcement;
