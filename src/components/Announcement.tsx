import styles from './Announcement.module.css';
import Image from 'next/image'

export type AnnouncementProps = {
  id: string;
  message: string;
  mediaSrc?: string;
  mediaType?: 'image' | 'video' | 'gif';
  alt?: string;
  caption?: string;
}

export default function Announcement({
  message,
  mediaSrc,
  mediaType,
  alt,
  caption,
}: AnnouncementProps) {
  const renderMedia = () => {
    if (!mediaSrc || !mediaType) return null;

    if (mediaType === 'video') {
      return (
        <figure className={styles.container}>
          <video
            data-testid="poster-video"
            className={styles.media}
            src={mediaSrc}
            aria-label={alt || 'Announcement video'}
            controls
            preload="metadata"
            playsInline
            autoPlay={true}
            loop={true}
            muted={false}
          />
          {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
        </figure>
      );
    }
    else if(mediaType === 'image')
    {
        return (
        <figure className={styles.container}>
          <Image
            src={mediaSrc}
            alt={alt || 'Announcement image'}
            objectFit="contain"
            fill={true}
          />
        </figure>
        );
    }
    else if(mediaType === 'gif')
    {
        return (
        <figure className={styles.container}>
          <Image
            src={mediaSrc}
            alt={alt || 'Announcement gif'}
            objectFit="contain"
            fill={true}
            unoptimized={true}
          />
        </figure>
        );
    }


    return <></>
  };

  return (
    <div className={styles.card}>
      <p className={styles.message}>{message}</p>
      {renderMedia()}
    </div>
  );
}

