// src/components/Poster/media.tsx
import React from 'react'
import Image from 'next/image'   // or your own wrapper around next/image
import Gif from './gif'
import Video from './video'

export interface MediaProps {
  src:       string       // ex: "/demo-media/foo.mp4" or "/demo-media/foo.png"
  alt?:      string
  loop?:     boolean      // for gif/video
  className?: string
  style?:    React.CSSProperties
}

const Media: React.FC<MediaProps> = ({
  src,
  alt = '',
  loop = false,
  className,
  style,
}) => {
  const ext = src.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'mp4':
      return (
        <Video
          path={src}
          autoplay
          loop={loop}
          muted
          className={className}
          style={style}
        />
      )
    case 'gif':
      return (
        <Gif
          path={src}
          alt={alt}
          loop={loop}
          className={className}
          style={style}
        />
      )
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'webp':
      return (
        <Image
          src={src}
          alt={alt}
          width={1600}             // required
          height={900}             // required
          fill                  // ← tell Next.js “yes, I want you to fill the parent”
           style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '90%',         // override the rendered output to stretch
    height: '90%',        // to fill the parent anyway
    objectFit: 'cover',
    ...style,
  }}
  className={className}
        />
      )
    default:
      return <div>Unsupported format: .{ext}</div>
  }
}

export default Media
