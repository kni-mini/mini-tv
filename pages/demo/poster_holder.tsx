// pages/demo/poster_holder.tsx
import React, { useState, useEffect, useCallback } from 'react';
import fs from 'fs';
import path from 'path';
import { GetStaticProps, NextPage } from 'next';
import Media from './poster/Media';

interface Props {
  files: string[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const mediaDir = path.join(process.cwd(), 'public', 'demo-media');
  const rawFiles = fs.readdirSync(mediaDir);
  const files = rawFiles
    .filter((f) => /\.(mp4|gif|jpe?g|png|webp)$/i.test(f))
    .map((f) => `/demo-media/${f}`);
  return { props: { files } };
};

const PosterHolder: NextPage<Props> = ({ files }) => {
  const [idx, setIdx] = useState(0);

  // Advance slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((current) => (current + 1) % files.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [files.length]);

  const prev = useCallback(
    () => setIdx((current) => (current - 1 + files.length) % files.length),
    [files.length]
  );
  const next = useCallback(
    () => setIdx((current) => (current + 1) % files.length),
    [files.length]
  );

  // Get current time/date strings
  const now = new Date();
  const timeString = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const dateString = now.toLocaleDateString([], {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-black">
      {/* ── HEADER (always 5% of viewport) ── */}
      <header style={{
          height: '4%',
          position: 'fixed',
          top: 0,
          width: '100%',
          padding: '0.5rem',
          background: 'black',
          color: 'white',
          textAlign: 'center',
          fontSize: '3.0vh',
          
        }}>
        {timeString}
      </header>

      {/* ── MAIN (exactly 90% of viewport, so it sits between header & footer) ── */}
     <main className="relative h-[90%]">
  {/* Prev/Next buttons here */}
  <Media
    src={files[idx]}
    alt={files[idx].split('/').pop() || ''}
    loop
    style={{
      position: 'fixed',
      
      top: '5%',
      left: 0,
      width: '100%',
      height: '90%',
      // objectFit: 'cover' is already wired in the Image above.
    }}
  />
</main>

      {/* ── FOOTER (always 5% of viewport) ── */}
      <footer 
      style={{
          height: '4%',
          position: 'fixed',
          bottom: 0,
          width: '100%',
          padding: '0.5rem',
          background: 'black',
          color: 'white',
          textAlign: 'center',
          fontSize: '3.0vh',
          
        }}>
        {dateString}
      </footer>
    </div>
  );
};

export default PosterHolder;
