import React from 'react';
import {useT} from '../time';
import {colors, fonts} from '../config/brand';
import {ease, progress} from '../motion';

// Small scene label: a printed colour chip + ink text.
export const Label: React.FC<{children: React.ReactNode; chip?: string}> = ({children, chip = colors.pink}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
    <div style={{width: 22, height: 22, borderRadius: 11, background: chip}} />
    <span style={{fontFamily: fonts.text, fontWeight: 700, fontSize: 30, letterSpacing: '0.02em', color: colors.ink}}>{children}</span>
  </div>
);

// Headline block used by every scene: label → headline lines → supporting line.
// Frames are local to the parent <Sequence>. `exitAt` = local frame where the block starts leaving.
export const TextBlock: React.FC<{
  label?: React.ReactNode;
  chip?: string;
  headline: readonly string[];
  sub?: string;
  x?: number;
  y?: number;
  width?: number;
  headlineSize?: number;
  subSize?: number;
  delay?: number;
  exitAt?: number;
}> = ({label, chip, headline, sub, x = 80, y = 150, width = 920, headlineSize = 108, subSize = 38, delay = 4, exitAt}) => {
  const frame = useT();
  const exit = exitAt === undefined ? 0 : progress(frame, exitAt, exitAt + 12, ease.in);
  const lineDelay = 5;
  const labelIn = progress(frame, delay, delay + 16);
  const headStart = delay + (label ? 6 : 0);
  const subStart = headStart + headline.length * lineDelay + 8;
  const subIn = progress(frame, subStart, subStart + 18);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        opacity: 1 - exit,
        transform: `translateY(${-30 * exit}px)`,
      }}
    >
      {label ? (
        <div style={{marginBottom: 22, opacity: labelIn, transform: `translateY(${(1 - labelIn) * 16}px)`}}>
          {typeof label === 'string' ? <Label chip={chip}>{label}</Label> : label}
        </div>
      ) : null}
      <div
        style={{
          fontFamily: fonts.display,
          fontWeight: 800,
          fontSize: headlineSize,
          lineHeight: 0.94,
          letterSpacing: '-0.015em',
          color: colors.ink,
        }}
      >
        {headline.map((line, i) => {
          const t = progress(frame, headStart + i * lineDelay, headStart + i * lineDelay + 20);
          return (
            <div key={i} style={{overflow: 'hidden', paddingBottom: '0.06em', marginBottom: '-0.06em'}}>
              <div style={{transform: `translateY(${(1 - t) * 105}%)`}}>{line}</div>
            </div>
          );
        })}
      </div>
      {sub ? (
        <div
          style={{
            fontFamily: fonts.text,
            fontWeight: 500,
            fontSize: subSize,
            lineHeight: 1.3,
            color: colors.inkSoft,
            marginTop: 24,
            opacity: subIn,
            transform: `translateY(${(1 - subIn) * 14}px)`,
            textWrap: 'balance',
          }}
        >
          {sub}
        </div>
      ) : null}
    </div>
  );
};
