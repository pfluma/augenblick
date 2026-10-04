import React from 'react';
import {colors, fonts} from '../config/brand';
import {ui} from '../config/copy';
import {Icon} from '../components/Icon';
import {SCREEN} from '../components/Phone';
import {Badge, PAD, ScreenBase, StatusBar} from './common';

export const MAP_PIN = {x: 300, y: 330};

// Abstract city map: blocks, a park and a canal. No real map data.
const MapArt: React.FC = () => (
  <svg width={SCREEN.w} height={640} viewBox={`0 0 ${SCREEN.w} 640`} style={{position: 'absolute', top: 0, left: 0}}>
    <rect width={SCREEN.w} height={640} fill={colors.paperDark} />
    <path d="M-20 470 C 120 430, 260 520, 420 470 S 620 420, 640 440 L 640 520 C 520 500, 420 560, 260 560 S 60 520, -20 540 Z" fill={colors.blueLight} />
    <rect x={360} y={110} width={170} height={150} rx={18} fill="#DDE9D8" />
    <g stroke={colors.white} strokeWidth={18} strokeLinecap="round" fill="none">
      <path d="M-20 200 L 600 160" />
      <path d="M-20 380 L 600 330" />
      <path d="M120 0 L 170 640" />
      <path d="M300 0 L 320 460" />
      <path d="M470 0 L 520 640" />
    </g>
    <g stroke={colors.white} strokeWidth={8} strokeLinecap="round" fill="none" opacity={0.9}>
      <path d="M-20 290 L 600 250" />
      <path d="M220 0 L 240 460" />
      <path d="M30 0 L 60 640" />
    </g>
  </svg>
);

export const Pin: React.FC<{size?: number; pulse?: number}> = ({size = 64, pulse = 0}) => (
  <div style={{position: 'relative', width: size, height: size * 1.25}}>
    <div
      style={{
        position: 'absolute',
        left: size / 2 - size * 0.9,
        bottom: -size * 0.45,
        width: size * 1.8,
        height: size * 0.9,
        borderRadius: '50%',
        border: `3px solid ${colors.pink}`,
        opacity: pulse > 0 ? (1 - pulse) * 0.8 : 0,
        transform: `scale(${0.4 + pulse * 0.9})`,
      }}
    />
    <svg width={size} height={size * 1.25} viewBox="0 0 48 60" style={{position: 'absolute', filter: 'drop-shadow(0 6px 8px rgba(22,36,74,.25))'}}>
      <path d="M24 58S4 38 4 22a20 20 0 0 1 40 0c0 16-20 36-20 36Z" fill={colors.pink} />
      <circle cx="24" cy="22" r="8" fill={colors.white} />
    </svg>
  </div>
);

export const PlaceScreen: React.FC<{pin?: number; pulse?: number; sheet?: number}> = ({pin = 1, pulse = 0, sheet = 1}) => {
  const d = ui.place;
  return (
    <ScreenBase id="place" bg={colors.paperDark}>
      <MapArt />
      <div style={{position: 'absolute', top: 0, left: 0, right: 0}}>
        <StatusBar />
      </div>
      <div
        style={{
          position: 'absolute',
          left: MAP_PIN.x - 32,
          top: MAP_PIN.y - 80 - (1 - pin) * 120,
          opacity: Math.min(1, pin * 3),
        }}
      >
        <Pin size={64} pulse={pulse} />
      </div>
      <div
        style={{
          position: 'absolute',
          top: 560 + (1 - sheet) * 200,
          left: 0,
          right: 0,
          bottom: 0,
          background: colors.white,
          borderRadius: '34px 34px 0 0',
          boxShadow: '0 -10px 30px rgba(22,36,74,0.08)',
          padding: `18px ${PAD}px 0`,
        }}
      >
        <div style={{width: 64, height: 6, borderRadius: 3, background: colors.line, margin: '0 auto 26px'}} />
        <Badge size={19}>{d.badge}</Badge>
        <div style={{fontFamily: fonts.display, fontWeight: 800, fontSize: 64, lineHeight: 1, color: colors.ink, marginTop: 16}}>
          {d.title}
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 6, color: colors.inkPale, marginTop: 8, fontFamily: fonts.text, fontWeight: 500, fontSize: 21}}>
          <Icon name="pin" size={20} />
          {d.area}
        </div>
        <div style={{fontFamily: fonts.text, fontWeight: 500, fontSize: 24, lineHeight: 1.35, color: colors.ink, marginTop: 18}}>{d.text}</div>
        <div style={{height: 1.5, background: colors.line, margin: '24px 0 18px'}} />
        <div style={{fontFamily: fonts.text, fontWeight: 700, fontSize: 17, letterSpacing: '0.08em', textTransform: 'uppercase', color: colors.inkPale}}>
          {d.nextLabel}
        </div>
        <div
          style={{
            marginTop: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: 16,
            borderRadius: 20,
            border: `1.5px solid ${colors.line}`,
          }}
        >
          <div style={{width: 54, height: 54, borderRadius: 14, background: colors.pink, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.white}}>
            <Icon name="table" size={30} />
          </div>
          <div>
            <div style={{fontFamily: fonts.text, fontWeight: 700, fontSize: 22, color: colors.ink}}>{d.next}</div>
            <div style={{fontFamily: fonts.text, fontWeight: 500, fontSize: 19, color: colors.inkPale, marginTop: 2}}>{d.nextWhen}</div>
          </div>
        </div>
      </div>
    </ScreenBase>
  );
};
