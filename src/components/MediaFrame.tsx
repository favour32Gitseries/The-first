import { useEffect, useRef, useState } from 'react';
import { Film, Image as ImageIcon } from 'lucide-react';

interface MediaFrameProps {
  src: string;
  alt: string;
  className?: string;
  videoSrc?: string;
  previewStartTime?: number;
  isPlaying?: boolean;
  isVideoItem?: boolean;
  fallbackTitle?: string;
}

/**
 * Resilient media wrapper with zero-broken-image fallback.
 * Plays an HTML5 <video> on hover when `videoSrc` is provided, seeking to
 * `previewStartTime` when resting so the thumbnail shows an expressive frame.
 */
export function MediaFrame({
  src,
  alt,
  className = '',
  videoSrc,
  previewStartTime = 0,
  isPlaying = false,
  isVideoItem = false,
  fallbackTitle = 'Nhenye Visuals',
}: MediaFrameProps) {
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    if (isPlaying) {
      video.play().catch(() => {
        // Autoplay may be blocked in strict environments; resting frame remains visible
      });
    } else {
      video.pause();
      if (previewStartTime > 0 && video.readyState >= 1) {
        video.currentTime = previewStartTime;
      }
    }
  }, [isPlaying, videoSrc, previewStartTime]);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video && previewStartTime > 0 && !isPlaying) {
      video.currentTime = previewStartTime;
    }
  };

  if (videoSrc && !hasError) {
    return (
      <video
        ref={videoRef}
        src={videoSrc}
        poster={src || undefined}
        preload="metadata"
        loop
        muted
        playsInline
        aria-label={alt}
        onLoadedMetadata={handleLoadedMetadata}
        onError={() => setHasError(true)}
        className={`h-full w-full object-cover transition-transform duration-500 ease-out ${
          isPlaying ? 'scale-[1.03]' : 'scale-100'
        } ${className}`}
      />
    );
  }

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#181818] via-[#0D0D0D] to-[#134E4A] p-6 text-center text-[#EFE6D5] ${className}`}
      >
        {isVideoItem ? (
          <Film className="h-8 w-8 text-[#2DD4BF]" aria-hidden="true" />
        ) : (
          <ImageIcon className="h-8 w-8 text-[#2DD4BF]" aria-hidden="true" />
        )}
        <span className="font-display text-sm font-semibold tracking-tight">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
        isPlaying ? 'scale-105' : 'scale-100'
      } ${className}`}
    />
  );
}
