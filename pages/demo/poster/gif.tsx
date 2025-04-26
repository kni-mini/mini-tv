import React, { useState, useEffect } from 'react'
import Poster from '../../../src/components/Poster'

function useWindowSize() {
  const [size, setSize] = useState({ width: 320, height: 180 })

  useEffect(() => {
    const onResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return size
}

const GifPage: React.FC = () => {
  const { width, height } = useWindowSize()

  return (
    <div
      style={{
        position: 'relative',
        width:  '100vw',
        height: '100vh',
        background: '#000',
      }}
    >
      <Poster
        type="gif"
        src="/demo-media/sample.gif"
        alt="Sample animated GIF"
        width={width}
        height={height}
        loop
      />
    </div>
  )
}

export default GifPage
