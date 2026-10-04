import React from 'react';
import {Img, staticFile} from 'remotion';
import {colors, fonts, logo, wordmark} from '../config/brand';
import {logoFile} from '../config/assets';

// Two-circle mark. `gap` animates the circles apart (1 = fully apart, 0 = logo position).
export const LogoMark: React.FC<{size: number; gap?: number; overlapOpacity?: number}> = ({
  size,
  gap = 0,
  overlapOpacity = 1,
}) => {
  if (logoFile) return <Img src={staticFile(logoFile)} style={{height: size}} />;
  const r = 17;
  const shift = gap * 40; // in viewBox units
  const id = React.useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 64 44" height={size} width={(size * 64) / 44} style={{overflow: 'visible', display: 'block'}}>
      <defs>
        <clipPath id={`l${id}`}>
          <circle cx={24 - shift} cy="22" r={r} />
        </clipPath>
      </defs>
      <circle cx={24 - shift} cy="22" r={r} fill={logo.left} />
      <circle cx={40 + shift} cy="22" r={r} fill={logo.right} />
      <circle cx={40 + shift} cy="22" r={r} fill={logo.overlap} clipPath={`url(#l${id})`} opacity={overlapOpacity} />
    </svg>
  );
};

export const Wordmark: React.FC<{size: number; color?: string}> = ({size, color = colors.ink}) => (
  <span
    style={{
      fontFamily: fonts.display,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1,
      letterSpacing: '-0.015em',
      color,
    }}
  >
    {wordmark}
  </span>
);

export const Lockup: React.FC<{size: number}> = ({size}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: size * 0.32}}>
    <LogoMark size={size * 0.78} />
    <Wordmark size={size} />
  </div>
);
