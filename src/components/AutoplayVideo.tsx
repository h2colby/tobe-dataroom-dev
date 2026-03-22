'use client';

import { useRef, useEffect, useState } from 'react';

interface AutoplayVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

export function AutoplayVideo({ src, poster, className = '' }: AutoplayVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const webmSrc = src.replace('.mp4', '.webm');

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const tryPlay = () => {
      if (!video) return;
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay blocked — show play button
        setIsPlaying(false);
      });
    };

    // Try immediately
    tryPlay();

    // Intersection Observer — play when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) tryPlay();
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    // Listen for any page interaction
    const handleInteraction = () => {
      document.querySelectorAll('video').forEach((v) => {
        const vid = v as HTMLVideoElement;
        if (vid.paused) {
          vid.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      });
    };
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    document.addEventListener('scroll', handleInteraction, { once: true });

    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, []);

  const handleClick = () => {
    const video = ref.current;
    if (video && video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={className}
        poster={poster}
      >
        <source src={webmSrc} type="video/webm" />
        <source src={src} type="video/mp4" />
      </video>
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity hover:bg-black/10">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur-sm">
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none" className="ml-1">
              <path d="M0 0L20 12L0 24V0Z" fill="white" fillOpacity="0.8" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
