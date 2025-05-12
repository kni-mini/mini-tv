import React from 'react';
import Gif from './poster/gif';
import Image from './poster/image';
import Video from './poster/video';

export interface PosterHolderProps {
  src?: string;
  alt?: string;
  loop?: boolean;
  className?: string;
}

const PosterHolder: React.FC<PosterHolderProps> = ({ src, alt, loop, className }) => {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString([], { year: 'numeric', month: 'short', day: '2-digit' });
  
  return (
    <div className="flex flex-col h-screen w-screen bg-black overflow-hidden">
       <header
        style={{
          height: '4.0vh',
          padding: '0.3rem',
          background: 'black',
          color: 'white',
          textAlign: 'center',
          fontSize: '3vh',  
        }}
      >
        {timeString}
      </header>
      
      <main className="h-5/6 flex justify-center items-center p-4">
        <div className="max-h-full max-w-full">
          <Image />
        </div>
      </main>
      
      <footer
        style={{
          height: '4.0vh',
          padding: '0.5rem',
          background: 'black',
          color: 'white',
          textAlign: 'center',
          fontSize: '3.0vh',
          
        }}
      >
        {dateString}
      </footer>
    </div>
  );
};

export default PosterHolder;