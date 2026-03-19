'use client';

import { useReducedMotion } from 'framer-motion';

type VideoBackgroundProps = {
  /** Base name of the video file (without extension) in /videos/ directory */
  videoName: string;
  /** Optional poster image to show before video loads */
  poster?: string;
  /** CSS class for the container */
  className?: string;
  /** Opacity of the video (0-1) */
  opacity?: number;
  /** Whether to show a static fallback image when prefers-reduced-motion is enabled */
  staticFallback?: string;
};

/**
 * Accessible video background component that respects prefers-reduced-motion.
 * Automatically serves WebM for supporting browsers and MP4 as fallback.
 *
 * Usage:
 * <VideoBackground videoName="pulsed-waveform" opacity={0.3} />
 */
export default function VideoBackground({
  videoName,
  poster,
  className = '',
  opacity = 1,
  staticFallback,
}: VideoBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();

  // For users who prefer reduced motion, show static fallback or nothing
  if (shouldReduceMotion) {
    if (staticFallback) {
      return (
        <div
          className={`absolute inset-0 ${className}`}
          style={{
            backgroundImage: `url(${staticFallback})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity,
          }}
          aria-hidden="true"
        />
      );
    }
    return null;
  }

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover"
      >
        {/* WebM for modern browsers (smaller file size) */}
        <source src={`/videos/${videoName}.webm`} type="video/webm" />
        {/* MP4 as fallback for Safari and older browsers */}
        <source src={`/videos/${videoName}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
}
