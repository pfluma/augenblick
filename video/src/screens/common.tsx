import React from 'react';
import {Img, staticFile} from 'remotion';
import {colors, fonts} from '../config/brand';
import {ui} from '../config/copy';
import {screenshots} from '../config/assets';
import {SCREEN} from '../components/Phone';

export const PAD = 30;

export const swatch = (c: string) =>
  ({pink: colors.pink, blue: colors.blue, violet: colors.violet, sky: colors.sky})[c] ?? colors.ink;

export const StatusBar: React.FC<{dark?: boolean}> = ({dark}) => {
  const c = dark ? colors.white : colors.ink;
  return (
    <div
      style={{
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 44px 0 52px',
        fontFamily: fonts.text,
        fontWeight: 600,
        fontSize: 22,
        color: c,
      }}
    >
      <span>{ui.statusTime}</span>
      <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
        <div style={{display: 'flex', alignItems: 'flex-end', gap: 3, height: 16}}>
          {[6, 9, 12, 15].map((h) => (
            <div key={h} style={{width: 4, height: h, borderRadius: 1, background: c}} />
          ))}
        </div>
        <div
          style={{
            width: 34,
            height: 17,
            borderRadius: 5,
            border: `2px solid ${c}`,
            padding: 2,
            opacity: 0.9,
          }}
        >
          <div style={{width: '72%', height: '100%', borderRadius: 2, background: c}} />
        </div>
      </div>
    </div>
  );
};

// Wraps a mock screen; if a real screenshot is configured, shows that instead.
export const ScreenBase: React.FC<{id: keyof typeof screenshots; children: React.ReactNode; bg?: string}> = ({
  id,
  children,
  bg = colors.paper,
}) => {
  const shot = screenshots[id];
  return (
    <div style={{width: SCREEN.w, height: SCREEN.h, background: bg, position: 'relative', overflow: 'hidden'}}>
      {shot ? (
        <Img src={staticFile(shot)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      ) : (
        children
      )}
    </div>
  );
};

export const Badge: React.FC<{children: React.ReactNode; size?: number}> = ({children, size = 18}) => (
  <span
    style={{
      fontFamily: fonts.text,
      fontWeight: 700,
      fontSize: size,
      color: colors.pinkText,
      background: colors.pinkLight,
      borderRadius: 999,
      padding: `${size * 0.28}px ${size * 0.7}px`,
      letterSpacing: '0.01em',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </span>
);

export const Toggle: React.FC<{on: number; scale?: number}> = ({on, scale = 1}) => {
  const w = 64 * scale;
  const h = 38 * scale;
  const k = h - 8 * scale;
  const bg = on > 0.5 ? colors.blue : colors.line;
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: h,
        background: bg,
        position: 'relative',
        flexShrink: 0,
        transition: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 4 * scale,
          left: 4 * scale + on * (w - k - 8 * scale),
          width: k,
          height: k,
          borderRadius: '50%',
          background: colors.white,
          boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
        }}
      />
    </div>
  );
};
