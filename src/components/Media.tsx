import { Timestamp } from 'next/dist/server/lib/cache-handlers/types';
import Image from 'next/image'
import React from 'react';

export type MediaProps = {
    id: number;
    file: string;
    name?: string,
    createdAt: Timestamp;
    deleteAt?: Timestamp;
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
            <figure>
              <video
                src={file}
                aria-label={alt || 'Announcement video'}
                controls
                preload="metadata"
                playsInline
                autoPlay={true}
                loop={true}
                muted={false}
              />
              {caption && <figcaption>{caption}</figcaption>}
            </figure>
          );
        }
        else if (mediaType === 'image')
        {
            return (
            <figure>
              <Image
                src={file}
                alt={alt || 'Announcement image'}
                objectFit="contain"
                fill={true}
              />
            </figure>
            );
        }
        else if (mediaType === 'gif')
        {
            return (
            <figure >
              <Image
                src={file}
                alt={alt || 'Announcement gif'}
                objectFit="contain"
                fill={true}
                unoptimized={true}
              />
            </figure>
            );
        }
    

        return <></>
      };

      return (<div> {renderMedia()} </div>)
}