// src/components/Poster/media.tsx
import React from 'react'
import Image from './image'
import Gif   from './gif'
import Video from './video'

export interface MediaProps {
  src:       string       // e.g. "/demo-media/foo.mp4"
  alt?:      string
  loop?:     boolean      // only used for gifs/videos
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
          path={src}
          alt={alt}
          fill
          className={className}
          style={style}
        />
      )
    default:
      return <div>Unsupported format: .{ext}</div>
  }
}

export default Media
