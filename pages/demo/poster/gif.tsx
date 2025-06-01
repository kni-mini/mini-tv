// src/components/Gif.tsx
import React from 'react'
import Poster from '../../../src/components/Poster'

export interface GifProps {
  /** Path to the GIF file (under /public) */
  path: string
  /** Alternate text */
  alt?: string
  /** Whether to loop (browsers loop GIFs by default anyway) */
  loop?: boolean
  /** Extra CSS classes on the container */
  className?: string
  /** Inline styles on the container or media element */
  style?: React.CSSProperties
}

const Gif: React.FC<GifProps> = ({
  path,
  alt = '',
  loop = false,
  className,
  style,
}) => (
  <Poster
    type="gif"
    src={path}
    alt={alt}
    loop={loop}
    className={className}
    style={style}
  />
)

export default Gif
