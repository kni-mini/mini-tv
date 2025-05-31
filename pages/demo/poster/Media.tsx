// src/components/Poster/media.tsx
import React from 'react'
import NextImage from 'next/image'
import Gif from './gif'
import Video from './video'

export interface MediaProps {
  src:       string                // ex: "/demo-media/foo.png" or "/demo-media/foo.mp4"
  alt?:      string
  loop?:     boolean               // only for <Gif> or <Video>
  className?: string
  style?:    React.CSSProperties   // any inline styles you want (we'll split out width/height)
}

const Media: React.FC<MediaProps> = ({
  src,
  alt = '',
  loop = false,
  className,
  style = {},
}) => {
  // 1.  Extract any sizing/positioning properties from `style`.
  //     Everything else (e.g. objectFit, filter, etc.) will go onto the <NextImage> itself.
  const {
    width:  providedWidth,
    height: providedHeight,
    position: providedPosition,
    top:    providedTop,
    left:   providedLeft,
    right:  providedRight,
    bottom: providedBottom,
    ...restStyle // restStyle now holds { objectFit?, filter?, opacity?, etc. }
  } = style

  // 2.  Build a container style that gives us a "position: relative" box of the desired size:
  const containerStyle: React.CSSProperties = {
    // Always make the wrapper “position: relative” so that `fill` can absolutely fill it:
    position: providedPosition ?? 'relative',
    width:    providedWidth  ?? '100%',  // default to 100% of parent if no width provided
    height:   providedHeight ?? '100%',  // default to 100% of parent if no height provided

    // If user explicitly passed top/left/right/bottom, carry those over:
    ...(providedTop    !== undefined ? { top:    providedTop    } : {}),
    ...(providedLeft   !== undefined ? { left:   providedLeft   } : {}),
    ...(providedRight  !== undefined ? { right:  providedRight  } : {}),
    ...(providedBottom !== undefined ? { bottom: providedBottom } : {}),
  }

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
        <div style={containerStyle}>
          <NextImage
            src={src}
            alt={alt}
            fill
            className={className}
            // Only pass “restStyle” to NextImage.  DO NOT pass width/height here!
            style={{
              // you can still do objectFit or any other non-sizing CSS:
              objectFit: 'cover',
              ...restStyle,
            }}
          />
        </div>
      )

    default:
      return <div>Unsupported format: .{ext}</div>
  }
}

export default Media
