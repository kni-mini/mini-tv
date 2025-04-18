// src/components/Poster.tsx
import React from 'react'
import Image from 'next/image'
import styles from './Poster.module.css'

export type PosterProps = {
  type: 'image' | 'gif' | 'video'
  src: string
  alt?: string            // for images/gifs
  width?: number
  height?: number
  autoplay?: boolean      // only for video
  loop?: boolean          // video + gif
  muted?: boolean         // only for video
}

export const Poster: React.FC<PosterProps> = ({
  type,
  src,
  alt = 'Poster',
  width = 320,
  height = 180,
  autoplay = false,
  loop = false,
  muted = false,
}) => {
  switch (type) {
    case 'image':
      return (
        <div className={styles.container} style={{ width, height }}>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            objectFit="cover"
            loading="lazy"
          />
        </div>
      )

    case 'gif':
      return (
        <div className={styles.container} style={{ width, height }}>
          <img
            className={styles.media}
            src={src}
            alt={alt}
            loading="lazy"
          />
        </div>
      )

    case 'video':
      return (
        <div className={styles.container} style={{ width, height }}>
          <video
            data-testid="poster-video"
            className={styles.media}
            src={src}
            controls
            preload="metadata"
            playsInline
            autoPlay={autoplay}
            loop={loop}
            muted={muted}
          />
        </div>
      )

    default:
      return null
  }
}

export default Poster
