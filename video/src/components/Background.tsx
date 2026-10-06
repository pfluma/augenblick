import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors} from '../config/brand';

// Paper with a light print grain. Sits behind the phone, so screenshots stay untouched.
export const Background: React.FC = () => (
  <AbsoluteFill style={{background: colors.paper}}>
    <svg width="1080" height="1920" style={{position: 'absolute', inset: 0, opacity: 0.32, mixBlendMode: 'multiply'}}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.09  0 0 0 0 0.14  0 0 0 0 0.29  0 0 0 -1.6 1.05" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  </AbsoluteFill>
);

// Riso raster dots that fade out across a corner (like the app's event cards).
export const Halftone: React.FC<{
  width: number;
  height: number;
  color: string;
  step?: number;
  corner?: 'tr' | 'bl' | 'tl' | 'br';
  opacity?: number;
}> = ({width, height, color, step = 16, corner = 'tr', opacity = 1}) => {
  const dots: React.ReactNode[] = [];
  const cols = Math.ceil(width / step);
  const rows = Math.ceil(height / step);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const fx = corner === 'tr' || corner === 'br' ? c / cols : 1 - c / cols;
      const fy = corner === 'tr' || corner === 'tl' ? 1 - r / rows : r / rows;
      const k = Math.max(0, Math.min(fx, fy) * 1.25 - 0.1);
      if (k <= 0.02) continue;
      dots.push(<circle key={`${r}-${c}`} cx={c * step + step / 2} cy={r * step + step / 2} r={(step / 2) * 0.9 * k} />);
    }
  }
  return (
    <svg width={width} height={height} style={{display: 'block', opacity}} fill={color}>
      {dots}
    </svg>
  );
};
