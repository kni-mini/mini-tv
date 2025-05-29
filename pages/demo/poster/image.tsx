import React from 'react'
import Poster from '../../../src/components/Poster'

export interface ImageProps {
  /** Path to the image file */
  path: string
  /** Alternate text (defaults to empty string) */
  alt?: string
  /** Pass through any additional CSS classes */
  className?: string
  /** If you want it to fill its container */
  fill?: boolean
  /** Inline styles (e.g. objectFit) */
  style?: React.CSSProperties
}

const Image: React.FC<ImageProps> = ({
  path,
  alt = '',
  className,
  fill = false,
  style,
}) => (
  <Poster
    type="image"
    src={path}
    alt={alt}
    fill={fill}
    className={className}
    style={style}
  />
)

export default Image