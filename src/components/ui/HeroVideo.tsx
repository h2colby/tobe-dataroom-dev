'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';

type HeroVideoProps = {
  /** CSS class for additional styling */
  className?: string;
  /** Opacity of the video layer (0-1) */
  opacity?: number;
};

/**
 * Hero video background component optimized for LCP performance.
 *
 * Features:
 * - Fixed position so video stays visible while scrolling
 * - Positioned to the right side for asymmetric layout
 * - Plays once and freezes on last frame
 * - Restarts when user scrolls back to top
 * - Lazy-loads video after initial paint
 * - Respects prefers-reduced-motion
 *
 * Video files expected at:
 * - /hero/hero.mp4 (H.264)
 */
export default function HeroVideo({
  className = '',
  opacity = 0.7,
}: HeroVideoProps) {
  const shouldReduceMotion = useReducedMotion();
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPlayedRef = useRef(false);
  const wasAtTopRef = useRef(true);

  // Lazy-load video after initial paint
  useEffect(() => {
    // Skip video loading entirely for reduced motion preference
    if (shouldReduceMotion) return;

    // Use requestIdleCallback if available, otherwise setTimeout
    const loadVideo = () => setShouldLoadVideo(true);

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(loadVideo, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    } else {
      const id = setTimeout(loadVideo, 100);
      return () => clearTimeout(id);
    }
  }, [shouldReduceMotion]);

  // Handle scroll to restart video when returning to top
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const isAtTop = scrollY < 100; // Consider "at top" if within 100px

    // If we've scrolled back to top and video has already played, restart it
    if (isAtTop && !wasAtTopRef.current && hasPlayedRef.current && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      hasPlayedRef.current = false;
    }

    wasAtTopRef.current = isAtTop;
  }, []);

  // Set up scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Handle time update - pause just before the end (before black frame)
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || hasPlayedRef.current) return;

    // Pause ~0.2 seconds before the end to avoid the black frame
    const timeBeforeEnd = video.duration - video.currentTime;
    if (timeBeforeEnd <= 0.2 && timeBeforeEnd > 0) {
      video.pause();
      hasPlayedRef.current = true;
    }
  }, []);

  // Handle video ended - fallback in case timeupdate doesn't catch it
  const handleVideoEnded = useCallback(() => {
    hasPlayedRef.current = true;
  }, []);

  return (
    <div
      className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Video container - extends past right edge so video's 75% point anchors to viewport edge */}
      {/* This crops the rightmost ~25% of the video off-screen */}
      <div
        className="absolute top-0 w-[120%] md:w-[95%] lg:w-[85%] h-full"
        style={{
          right: '-15%',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.4) 85%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.4) 85%, rgba(0,0,0,0) 100%)',
        }}
      >
        {/* Video - anchored to right of container (which extends off-screen) */}
        {/* Plays once and freezes on last frame; restarts when scrolling back to top */}
        {shouldLoadVideo && !shouldReduceMotion && (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: 0.85,
              objectPosition: 'right top',
            }}
          >
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>
        )}

        {/* Fallback gradient when video isn't loaded */}
        {!shouldLoadVideo && (
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 70% 50%, rgba(255, 107, 53, 0.08) 0%, transparent 60%)',
            }}
          />
        )}
      </div>

      {/* Subtle radial glow accent */}
      <div
        className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[600px] h-[600px] pointer-events-none hidden lg:block"
        style={{
          background: 'radial-gradient(circle, rgba(255, 107, 53, 0.06) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
