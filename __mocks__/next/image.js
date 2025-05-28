// __mocks__/next/image.js
import * as React from 'react';

const NextImage = ({ src, alt, fill, unoptimized, priority, sizes, quality, ...props }) => (
  // render a plain <img> with only valid HTML attributes
  <img src={src} alt={alt} {...props} />
);

export default NextImage;
