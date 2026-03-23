// /src/lib/design-tokens.ts

export const colors = {
  bg: {
    primary: '#0a0a0f',
    surface1: '#0f0f17',
    surface2: '#12121a',
    surface3: '#16161f',
  },
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255,255,255,0.6)',
    muted: 'rgba(255,255,255,0.4)',
    dim: 'rgba(255,255,255,0.2)',
  },
  accent: {
    orange: '#ff6b35',
    orangeDim: 'rgba(255,107,53,0.08)',
    orangeGlow: 'rgba(255,107,53,0.25)',
    orangeBorder: 'rgba(255,107,53,0.2)',
    orangeStrong: 'rgba(255,107,53,0.6)',
  },
  semantic: {
    success: '#22c55e',
    warning: '#eab308',
    danger: '#ef4444',
    info: '#3b82f6',
  },
  chart: {
    primary: '#ff6b35',
    secondary: '#22c55e',
    tertiary: '#3b82f6',
    quaternary: '#eab308',
    negative: '#ef4444',
    muted: '#FFB380',
  },
  border: {
    subtle: 'rgba(255,255,255,0.05)',
    light: 'rgba(255,255,255,0.1)',
    medium: 'rgba(255,255,255,0.2)',
  },
} as const;

export const typography = {
  size: {
    display: '2.5rem',
    h1: '1.875rem',
    h2: '1.5rem',
    h3: '1.25rem',
    body: '0.875rem',
    caption: '0.75rem',
    micro: '0.65rem',
  },
  tracking: {
    normal: '0',
    wide: '0.05em',
    wider: '0.1em',
  },
  leading: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.625',
  },
} as const;

export const spacing = {
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
} as const;

export const animation = {
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.8,
  },
  ease: {
    out: 'easeOut',
    inOut: 'easeInOut',
  },
  stagger: 0.06,
} as const;

// Framer Motion preset variants
export const motionPresets = {
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
} as const;
