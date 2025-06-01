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
  // 1) First, filter/paginate announcements if you want to drop those that are not “active.”
  //    For this example, we’ll simply take all sampleAnnouncements whose startDate <= now.
  const now = new Date();
  const activeAnnouncements = useMemo(
    () => sampleAnnouncements.filter((a) => a.startDate <= now),
    [sampleAnnouncements, now]
  );

  // 2) Build a “slides” array that interleaves media slides and **single**‐announcement slides.
  //    Pattern: [media0, ann0, media1, media2, media3, ann1, media4, media5, media6, ann2, …]
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

    let mIdx = 0; // index into files[]
    let aIdx = 0; // index into activeAnnouncements[]

    // 2a) If there is at least one media, show it first
    if (mIdx < files.length) {
      out.push({ type: 'media', src: files[mIdx++] });
    }

    // 2b) If there is at least one announcement, show that next
    if (aIdx < activeAnnouncements.length) {
      out.push({ type: 'announcement', data: activeAnnouncements[aIdx++] });
    }

    // 2c) Now repeat: show up to 3 media, then one announcement, until we run out of media
    while (mIdx < files.length) {
      for (let i = 0; i < 3 && mIdx < files.length; i++) {
        out.push({ type: 'media', src: files[mIdx++] });
      }
      if (aIdx < activeAnnouncements.length) {
        out.push({ type: 'announcement', data: activeAnnouncements[aIdx++] });
      }
    }

    // 2d) If there are leftover announcements (and no media left),
    //     you could push them as single slides here. Uncomment if desired:
    /*
    while (aIdx < activeAnnouncements.length) {
      out.push({
        type: 'announcement',
        data: activeAnnouncements[aIdx++],
      });
    }
    */

    return out;
  }, [files, activeAnnouncements]);

  // 3) Keep track of which “slide” is currently visible
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // 4) Advance every 5 seconds (5000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [slides.length]);

  // 5) Format header/footer times
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString([], { year: 'numeric', month: 'short', day: '2-digit' });

  // 6) Determine the current slide
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

      {/* ── MAIN (90% viewport height, pushed down by 5% so it doesn’t hide under header) ── */}
      <main>
        {currentSlide.type === 'media' ? (
          // If this slide is a media file, fill the entire area with <Media>
          <Media
            src={currentSlide.src}
            alt={currentSlide.src.split('/').pop() || 'media'}
            loop={true}
            style={{
              position: 'absolute',
              top: '5%',
              left: 0,
              width: '100%',
              height: '90%',
            }}
          />
        ) : (
          // If this slide is a single announcement, render exactly that one announcement
            <div style={{ paddingTop: '40%', height: '90%' , position: 'relative' }}>
            {/* Constrain the card to max‐width 32rem, center horizontally */}
            <div className="w-full max-w-lg">
              <Announcement {...currentSlide.data} />
            </div>
          </div>
        )}
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
