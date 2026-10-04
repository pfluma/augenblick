import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {colors, logo} from '../config/brand';
import {TOTAL} from '../config/timing';

// Paper background with the two brand circles drifting slowly towards each other
// over the whole film: a quiet echo of the logo (two people, one encounter).
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / TOTAL;
  const d = 620 - 360 * t;
  return (
    <AbsoluteFill style={{background: colors.paper, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          width: 1100,
          height: 1100,
          borderRadius: '50%',
          left: 540 - 550 - d,
          top: 1180 - 550,
          background: `radial-gradient(circle, ${logo.left}22 0%, ${logo.left}00 68%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 1100,
          height: 1100,
          borderRadius: '50%',
          left: 540 - 550 + d,
          top: 1080 - 550,
          background: `radial-gradient(circle, ${logo.right}1c 0%, ${logo.right}00 68%)`,
        }}
      />
    </AbsoluteFill>
  );
};
