import React from 'react';

// Minimal line icons (24×24 grid) for the mock UI.
const paths: Record<string, React.ReactNode> = {
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3 19.5c.6-3.3 3-5 6-5s5.4 1.7 6 5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16.5 14.6c2.5.2 4 1.7 4.5 4.4" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 17.8 5.6" />
      <path d="M19 9.5c0 5.3-7 11.5-7 11.5" />
      <path d="M4 4l16 16" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <path d="M4 4l16 16" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3Z" />
      <path d="M8.8 12.2l2.2 2.2 4.2-4.4" />
    </>
  ),
  pause: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10 9v6M14 9v6" />
    </>
  ),
  flag: (
    <>
      <path d="M5 21V4M5 4h11l-2 4 2 4H5" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  chevronLeft: <path d="M15 5l-7 7 7 7" />,
  chevronRight: <path d="M9 5l7 7-7 7" />,
  share: (
    <>
      <path d="M12 3v12M7.5 7.5L12 3l4.5 4.5" />
      <path d="M5 12v6.5A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V12" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  spark: (
    <>
      <circle cx="9" cy="12" r="5.5" />
      <circle cx="15" cy="12" r="5.5" />
    </>
  ),
  table: (
    <>
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="3.8" r="1.6" />
      <circle cx="12" cy="20.2" r="1.6" />
      <circle cx="3.8" cy="12" r="1.6" />
      <circle cx="20.2" cy="12" r="1.6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.8" />
      <path d="M4.5 20.5c.8-4 3.7-6 7.5-6s6.7 2 7.5 6" />
    </>
  ),
};

export const Icon: React.FC<{name: keyof typeof paths | string; size?: number; color?: string; stroke?: number}> = ({
  name,
  size = 24,
  color = 'currentColor',
  stroke = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{display: 'block', flexShrink: 0}}
  >
    {paths[name]}
  </svg>
);
