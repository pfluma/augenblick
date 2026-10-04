import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {colors, fonts} from '../config/brand';
import {copy} from '../config/copy';
import {LogoMark, Wordmark} from '../components/Logo';
import {ease, mix, progress} from '../motion';

// Two circles meet (the logo), settle into the lockup, the tagline lands. Then: hold.
export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const meet = progress(frame, 14, 40, ease.inOut);
  const appear = progress(frame, 12, 24);
  const overlap = progress(frame, 34, 44);
  const settle = progress(frame, 44, 64, ease.inOut);
  const word = progress(frame, 54, 70);

  const markH = mix(300, 150, settle);
  const markY = mix(960, 1120, settle);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: markY - markH / 2,
          display: 'flex',
          justifyContent: 'center',
          opacity: appear,
        }}
      >
        <LogoMark size={markH} gap={1.6 * (1 - meet)} overlapOpacity={overlap} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 1236,
          display: 'flex',
          justifyContent: 'center',
          opacity: word,
          transform: `translateY(${(1 - word) * 20}px)`,
        }}
      >
        <Wordmark size={112} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 600,
          textAlign: 'center',
          fontFamily: fonts.display,
          fontWeight: 800,
          fontSize: 132,
          lineHeight: 0.96,
          letterSpacing: '-0.015em',
          color: colors.ink,
        }}
      >
        {copy.closing.tagline.map((line, i) => {
          const t = progress(frame, 48 + i * 8, 70 + i * 8);
          return (
            <div key={line} style={{overflow: 'hidden', paddingBottom: '0.06em', marginBottom: '-0.06em'}}>
              <div style={{transform: `translateY(${(1 - t) * 105}%)`, color: i === 1 ? colors.pinkText : colors.ink}}>{line}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
