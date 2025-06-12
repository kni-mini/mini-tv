// src/components/Poster.tsx
import React from 'react'
import NextImage, { type ImageProps as NextImageProps } from 'next/image'
import styles from './Poster.module.css'


type BasePosterProps = {
  /** extra wrapper classes */
  className?: string
  /** extra inline styles on the container */
  style?: React.CSSProperties
}

export type ImagePosterProps = Omit<NextImageProps, 'unoptimized'> & {

  type:  'image'
  src:   string
  fill?: boolean
} & BasePosterProps

export type GifPosterProps = {
  type: 'gif'
  src:  string
  alt?: string
  loop?: boolean
} & BasePosterProps

export type VideoPosterProps = {
  type: 'video'
  src:  string
  autoplay?: boolean
  loop?:     boolean
  muted?:    boolean
} & BasePosterProps


export type PosterProps = ImagePosterProps | GifPosterProps | VideoPosterProps;

export const Poster: React.FC<PosterProps> = (props) => {
  const { className, style } = props

  switch (props.type) {
    case 'image': {

      const {
        src,
        alt   = 'Poster',
        fill  = false,
      } = props


      return (
        <div
          className={`${styles.container}${className ? ' ' + className : ''}`}
          style={style}
        >
          <NextImage
            src={src}
            alt={alt}
            {...(fill ? { fill: true } : {})}
            style={style}
            loading="lazy"
          />
        </div>
      );
    }

    case 'gif': {
      const { src, alt = 'Poster', loop = false } = props;
      return (

        <div
          className={`${styles.container}${className ? ' ' + className : ''}`}
          style={style}
        >
          <img

            className={styles.media}
            src={src}
            alt={alt}
            loading="lazy"
            {...(loop ? { /* gifs loop automatically */ } : {})}
          />
        </div>
      );
    }

    case 'video': {
      const { src, autoplay = false, loop = false, muted = false } = props;
      return (
        <div
          className={`${styles.container}${className ? ' ' + className : ''}`}
          style={style}
        >
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
      );
    }

    default:
      return null;
  }
};


export default Poster

