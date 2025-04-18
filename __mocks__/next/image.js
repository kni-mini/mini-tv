// __mocks__/next/image.js
import * as React from 'react'

const NextImage = ({ src, alt, ...props }) => (
  // render a plain <img> with the same props
  <img src={src} alt={alt} {...props} />
)

export default NextImage
