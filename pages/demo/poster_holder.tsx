// pages/demo/poster_holder.tsx
import React, { useState, useEffect, useCallback } from 'react'
import fs from 'fs'
import path from 'path'
import { GetStaticProps, NextPage } from 'next'
import Media from './poster/Media'

interface Props {
  files: string[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const mediaDir = path.join(process.cwd(), 'public', 'demo-media')
  const raw = fs.readdirSync(mediaDir)
  const files = raw
    .filter(f => /\.(mp4|gif|jpe?g|png|webp)$/i.test(f))
    .map(f => `/demo-media/${f}`)
  return { props: { files } }
}

const PosterHolder: NextPage<Props> = ({ files }) => {
  const [idx, setIdx] = useState(0)

  // advance every 5s:
  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % files.length), 5000)
    return () => clearInterval(timer)
  }, [files.length])

  const prev = useCallback(() => setIdx(i => (i - 1 + files.length) % files.length), [files.length])
  const next = useCallback(() => setIdx(i => (i + 1) % files.length), [files.length])

  const now = new Date()
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const dateString = now.toLocaleDateString([], { year: 'numeric', month: 'short', day: '2-digit' })

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-black">
      {/* HEADER */}
      <header
        style={{
          height: '5%',
          background: 'black',
          color: 'white',
          textAlign: 'center',
          fontSize: '3vh',
          lineHeight: '4vh',
        }}
      >
        {timeString}
      </header>

      {/* FULL‐SCREEN MEDIA */}
      <main className="relative flex-1">
        {/* Prev/Next buttons */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-2 z-10 -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded"
        >‹</button>
        <button
          onClick={next}
          className="absolute top-1/2 right-2 z-10 -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded"
        >›</button>

        {/* The media element itself absolutely filling the space */}
        <Media
          src={files[idx]}
          alt={files[idx].split('/').pop()}
          loop
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
          }}
        />
      </main>

      {/* FOOTER */}
      <footer
        style={{
          height: '4vh',
          background: 'black',
          color: 'white',
          textAlign: 'center',
          fontSize: '3vh',
          lineHeight: '4vh',
        }}
      >
        {dateString}
      </footer>
    </div>
  )
}

export default PosterHolder
