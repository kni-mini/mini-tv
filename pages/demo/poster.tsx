// pages/demo/poster.tsx
import React from 'react'
import Poster from '../../src/components/Poster'

const DemoPage: React.FC = () => (
  <div style={{ padding: 24 }}>
    <h1>Poster Component Demo</h1>

    <h2>Static Image</h2>
    <Poster
      type="image"
      src="/demo-media/sample.jpg"
      alt="Sample static image"
      width={400}
      height={225}
    />

    <h2>Animated GIF</h2>
    <Poster
      type="gif"
      src="/demo-media/sample.gif"
      alt="Sample animated GIF"
      width={400}
      height={225}
      loop
    />

    <h2>Video</h2>
    <Poster
      type="video"
      src="/demo-media/sample.mp4"
      width={400}
      height={225}
      autoplay
      loop
      muted
    />
  </div>
)

export default DemoPage
