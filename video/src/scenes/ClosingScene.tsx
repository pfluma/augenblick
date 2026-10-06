import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {colors, fonts} from '../config/brand';
import {copy} from '../config/copy';
import {LogoMark, Wordmark} from '../components/Logo';
import {ease, mix, progress} from '../motion';

// Two circles meet (the logo), settle into the lockup, the tagline lands,
// then "Bald in Wien." and the address. Then: hold.
export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const appear = progress(frame, 12, 24);
  const meet = progress(frame, 14, 40, ease.inOut);
  const overlap = progress(frame, 34, 44);
  const settle = progress(frame, 44, 64, ease.inOut);
  const word = progress(frame, 54, 70);
  const soon = progress(frame, 72, 88);

  const markH = mix(300, 140, settle);
  const markY = mix(960, 1010, settle);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 520,
          textAlign: 'center',
          fontFamily: fonts.display,
          fontWeight: 800,
          fontSize: 128,
          lineHeight: 1.04,
          letterSpacing: '-0.015em',
          color: colors.ink,
        }}
      >
        {copy.closing.tagline.map((line, i) => {
          const t = progress(frame, 48 + i * 8, 70 + i * 8);
          return (
            <div key={line} style={{overflow: 'hidden', paddingBottom: '0.06em', marginBottom: '-0.06em'}}>
              <div style={{transform: `translateY(${(1 - t) * 130}%)`}}>
                {/* second line printed on pink, ink on top */}
                <span style={i === 1 ? {background: colors.pink, padding: '0 18px'} : undefined}>{line}</span>
              </div>
            </div>
          );
        })}
      </div>

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
          top: 1110,
          display: 'flex',
          justifyContent: 'center',
          opacity: word,
          transform: `translateY(${(1 - word) * 20}px)`,
        }}
      >
        <Wordmark size={108} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 1300,
          textAlign: 'center',
          fontFamily: fonts.text,
          color: colors.ink,
          opacity: soon,
          transform: `translateY(${(1 - soon) * 16}px)`,
        }}
      >
        <div style={{fontWeight: 700, fontSize: 46}}>{copy.closing.soon}</div>
        <div style={{fontWeight: 500, fontSize: 34, marginTop: 14, color: colors.inkSoft}}>{copy.closing.url}</div>
      </div>
    </AbsoluteFill>
  );
};
