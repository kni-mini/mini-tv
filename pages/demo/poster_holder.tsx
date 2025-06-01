// pages/demo/poster_holder.tsx
import React, { useState, useEffect, useMemo } from 'react';
import fs from 'fs';
import path from 'path';
import { GetStaticProps, NextPage } from 'next';
import Media from './poster/Media';
import Announcement from '@/components/Announcement';
import type { AnnouncementProps } from '@/components/Announcement';
import { sampleAnnouncements } from '@/sampleData';
import { paginateAnnouncements } from './poster/paginateAnnouncements';

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
  // 1) Filter active announcements
  const now = new Date();
  const activeAnnouncements = useMemo(
    () => sampleAnnouncements.filter((a) => a.startDate <= now),
    [now]
  );

  // 2) Build interleaved slides
  const slides = useMemo<
    (
      | { type: 'media'; src: string }
      | { type: 'announcement'; data: AnnouncementProps }
    )[]
  >(() => {
    const out: (
      | { type: 'media'; src: string }
      | { type: 'announcement'; data: AnnouncementProps }
    )[] = [];
    let mIdx = 0;
    let aIdx = 0;

    if (mIdx < files.length) {
      out.push({ type: 'media', src: files[mIdx++] });
    }
    if (aIdx < activeAnnouncements.length) {
      out.push({ type: 'announcement', data: activeAnnouncements[aIdx++] });
    }
    while (mIdx < files.length) {
      for (let i = 0; i < 3 && mIdx < files.length; i++) {
        out.push({ type: 'media', src: files[mIdx++] });
      }
      if (aIdx < activeAnnouncements.length) {
        out.push({ type: 'announcement', data: activeAnnouncements[aIdx++] });
      }
    }
    return out;
  }, [files, activeAnnouncements]);

  // 3) Current slide index + fading state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // 4) Cycle with cross‐fade
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFading(true);
      const timeoutId = setTimeout(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
        setIsFading(false);
      }, 500);
      return () => clearTimeout(timeoutId);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [slides.length]);

  // 5) Header/footer times
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString([], { year: 'numeric', month: 'short', day: '2-digit' });

  // 6) Current slide
  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-black">
      {/* ── HEADER (fixed at top, 4% high) ── */}
      <header
        style={{
          height: '4%',
          position: 'fixed',
          top: 0,
          width: '100%',
          padding: '0.5rem',
          background: 'black',
          color: 'white',
          textAlign: 'center',
          fontSize: '3.0vh',
          zIndex: 10,
        }}
      >
        {timeString}
      </header>

      {/* ── MAIN (90vh, pushed down by 4%) ── */}
      <main style={{ position: 'relative', height: '90vh', marginTop: '4%' }}>
        <div
          style={{
            position: 'absolute',
            top: '3% ',
            left: 0,
            width: '100%',
            height: '100%',

            // Make transparent so media shows through
            backgroundColor: 'transparent',
            transition: 'opacity 1s ease-in-out',
            opacity: isFading ? 0 : 1,
          }}
        >
          {currentSlide.type === 'media' ? (
            <Media
              src={currentSlide.src}
              alt={currentSlide.src.split('/').pop() || 'media'}
              loop
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          ) : (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ width: '100%', maxWidth: '70rem' }}>
                <Announcement {...currentSlide.data} />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── FOOTER (fixed at bottom, 4% high) ── */}
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
          zIndex: 10,
        }}
      >
        {dateString}
      </footer>
    </div>
  );
};

export default PosterHolder;
