import React from 'react';
import Image, { type ImageProps as NextImageProps } from 'next/image';
import styles from './Poster.module.css';

export type ImagePosterProps = Omit<NextImageProps, 'unoptimized'> & {
  type: 'image';
  src: string;
  fill?: boolean;
  style?: React.CSSProperties;
};

export type GifPosterProps = {
  type: 'gif';
  src: string;
  alt?: string;
  loop?: boolean;
};

export type VideoPosterProps = {
  type: 'video';
  src: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
};

export type PosterProps = ImagePosterProps | GifPosterProps | VideoPosterProps;

export const Poster: React.FC<PosterProps> = (props) => {
  switch (props.type) {
    case 'image': {
      const { src, alt = 'Poster', fill = false, style = { objectFit: 'cover' } } = props;

      return (
        <div className={styles.container}>
          <Image
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
        <div className={styles.container}>
          <Image
            className={styles.media}
            src={src}
            alt={alt}
            loading="lazy"
            {...(loop ? { loop: true } : {})}
          />
        </div>
      );
    }

    case 'video': {
      const { src, autoplay = false, loop = false, muted = false } = props;
      return (
        <div className={styles.container}>
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

export default Poster;
