import Image from 'next/image'
import React from 'react';

export type MediaProps = {
    id: number;
    file: string;
    name?: string,
    createdAt: Date;
    deleteAt?: Date;
    alt?: string;
    caption?: string;
    mediaType: 'image' | 'video' | 'gif';
  }

export default function Media({
  file,
  name,
  createdAt,
  deleteAt,
  alt,
  caption,
  mediaType,
} : MediaProps) {
    const renderMedia = () => {
        if (mediaType === 'video') {
          return (
            <figure className="object-contain max-h-full max-w-full rounded-lg">
              <video
                className="object-contain max-h-full max-w-full rounded-lg"
                src={file}
                aria-label={alt || 'Announcement video'}
                controls
                preload="metadata"
                playsInline
                autoPlay
                loop
                muted={false}
              />
              {caption && <figcaption className="text-sm text-gray-500 mt-2 text-center">{caption}</figcaption>}
            </figure>
          );
        }
        else if (mediaType === 'image')
        {
            return (
            <figure className="object-contain max-h-full max-w-full rounded-lg">
              <Image
                className="object-contain"
                src={file}
                alt={alt || 'Announcement image'}
                fill
              />
            </figure>
            );
        }
        else if (mediaType === 'gif')
        {
            return (
            <figure className="relative w-full aspect-video overflow-hidden rounded-lg">
              <Image
                className="w-auto h-full rounded-lg"
                src={file}
                alt={alt || 'Announcement gif'}
                objectFit="contain"
                fill
                unoptimized={true}
              />
            </figure>
            );
        }
    
        return <></>
      };

      return (<div> {renderMedia()} </div>)
}