import Image from 'next/image';
import React from 'react';

export type MediaProps = {
  id: number;
  file: string;
  name?: string;
  createdAt: Date;
  deleteAt?: Date;
  alt?: string;
  caption?: string;
  autoPlay?: boolean;
  mediaType: string;
};

export default function Media({ file, alt, caption, autoPlay, mediaType }: MediaProps) {
  const renderMedia = () => {
    switch (mediaType) {
      case 'video':
        return (
          <figure className="flex flex-col w-full h-full">
            <div className="flex-1 min-h-0 overflow-auto">
              <video
                className="w-full h-full object-contain rounded-lg"
                src={file}
                aria-label={alt || 'Announcement video'}
                controls
                preload="metadata"
                playsInline
                autoPlay={autoPlay ?? true}
                loop
                muted={false}
              />
            </div>
            {caption && (
              <figcaption className="text-xs text-gray-500 text-center px-2">{caption}</figcaption>
            )}
          </figure>
        );

      case 'image':
        return (
          <div className="relative w-full h-full">
            <Image
              className="object-contain rounded-lg"
              src={file}
              alt={alt || `Announcement image`}
              fill
            />
          </div>
        );

      case 'gif':
        return (
          <div className="relative w-full h-full">
            <Image
              className="object-contain rounded-lg"
              src={file}
              alt={alt || `Announcement gif`}
              fill
              unoptimized={true}
            />
          </div>
        );

      default:
        return (
          <div className="w-full h-full text-center text-sm text-red-500 p-2">
            Unsupported media type: {mediaType}
          </div>
        );
    }
  };

  return renderMedia();
}
