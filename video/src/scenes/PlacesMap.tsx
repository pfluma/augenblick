import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {colors} from '../config/brand';
import {durations} from '../config/timing';
import {ease, progress} from '../motion';

// Faint street grid that draws itself behind the phone: the app reaching into the city.
const STREETS = [
  'M-40 520 L 1120 430',
  'M-40 1010 L 1120 900',
  'M-40 1520 L 1120 1400',
  'M200 -40 L 300 1960',
  'M690 -40 L 760 1960',
  'M980 -40 L 1010 1960',
  'M-40 1760 C 300 1660, 700 1820, 1120 1700',
];

export const PlacesMap: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = progress(frame, 0, 40, ease.inOut);
  const out = progress(frame, durations.places - 4, durations.places + 20, ease.in);
  return (
    <AbsoluteFill style={{opacity: 1 - out}}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g fill="none" stroke={colors.line} strokeWidth={22} strokeLinecap="round" opacity={0.55}>
          {STREETS.map((d, i) => (
            <path key={i} d={d} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - Math.min(1, Math.max(0, draw * 1.4 - i * 0.06))} />
          ))}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
