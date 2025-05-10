import React from 'react'
import Poster from '../../../src/components/Poster'

export default function ImagePage() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '95.6vh',
        background: '#000',

      }}
    >
      <Poster
        type="image"
        src="/demo-media/sample.jpg"
        alt="Sample static image"
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
  )
}
