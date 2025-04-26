import React from 'react'
import Image, { type ImageProps as NextImageProps } from 'next/image'
import styles from './Poster.module.css'


export type ImagePosterProps = Omit<NextImageProps, 'unoptimized'> & {
  type:  'image'
  src:   string

  // next-13 fill API
  fill?: boolean
  style?: React.CSSProperties
}

export type GifPosterProps = {
  type: 'gif'
  src: string
  alt?: string
  width?: number
  height?: number
  loop?: boolean
}

export type VideoPosterProps = {
  type: 'video'
  src: string
  width?: number
  height?: number
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
}

export type PosterProps = ImagePosterProps | GifPosterProps | VideoPosterProps


  export const Poster: React.FC<PosterProps> = (props) => {
    switch (props.type) {
      case 'image': {
        // now we narrow safely to ImagePosterProps
        const {
          src,
          alt     = 'Poster',
          width   = 320,
          height  = 180,
          fill    = false,
          style   = { objectFit: 'cover' },
        } = props
  
        // if you’re using `fill`, you _omit_ the inline width/height; 
        // otherwise you can size the container
        const containerStyle = fill
          ? undefined
          : ({ width, height })
  
        return (
          <div className={styles.container} style={containerStyle}>
            <Image
              src={src}
              alt={alt}
              width={fill ? undefined : width}
              height={fill ? undefined : height}
              fill={fill}
              style={style}
              loading="lazy"
            />
          </div>
        )
      }
  
      case 'gif': {
        const { src, alt = 'Poster', width = 320, height = 180, loop = false } = props
        return (
          <div className={styles.container} style={{ width, height }}>
            <img
              className={styles.media}
              src={src}
              alt={alt}
              loading="lazy"
              {...(loop ? { loop: true } : {})}
            />
          </div>
        )
      }
  
      case 'video': {
        const { src, width = 320, height = 180, autoplay = false, loop = false, muted = false } = props
        return (
          <div className={styles.container} style={{ width, height }}>
            <video
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
      }
  
      default:
        return null
    }
  }
  

export default Poster
