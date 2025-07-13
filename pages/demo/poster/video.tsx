import Poster from '../../../src/components/Poster';

export interface VideoProps {
  /** Path to the video file */
  path: string;
  /** Auto‐play the video (default: false) */
  autoplay?: boolean;
  /** Loop the video (default: false) */
  loop?: boolean;
  /** Mute the video (default: false) */
  muted?: boolean;
  /** Pass additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

const Video: React.FC<VideoProps> = ({
  path,
  autoplay = false,
  loop = false,
  muted = false,
  className,
  style,
}) => (
  <Poster
    type="video"
    src={path}
    autoplay={autoplay}
    loop={loop}
    muted={muted}
    className={className}
    style={style}
  />
);

export default Video;
