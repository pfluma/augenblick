import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {colors, fonts} from '../config/brand';
import {copy} from '../config/copy';
import {durations} from '../config/timing';
import {Halftone} from '../components/Background';
import {Icon} from '../components/Icon';
import {TextBlock} from '../components/TextBlock';
import {ease, mix, progress} from '../motion';

// Two notes – pink and blue, two people telling the same moment – slide over each other.
// Where they overlap the print turns violet: the resonance. Violet exists only in that overlap.

const W = 590;
const H = 430;
const PINK_END = {x: 90, y: 740};
const BLUE_END = {x: 400, y: 1030};
const ROT = -3; // the whole pair sits slightly askew, like paper on a table

type Rect = {x: number; y: number; w: number; h: number};

const intersect = (a: Rect, b: Rect): Rect | null => {
  const x = Math.max(a.x, b.x);
  const y = Math.max(a.y, b.y);
  const r = Math.min(a.x + a.w, b.x + b.w);
  const btm = Math.min(a.y + a.h, b.y + b.h);
  return r > x && btm > y ? {x, y, w: r - x, h: btm - y} : null;
};

const NoteText: React.FC<{quote: string; color: string; top: number}> = ({quote, color, top}) => (
  <div style={{position: 'absolute', left: 34, right: 34, top, color, fontFamily: fonts.text}}>
    <div style={{fontWeight: 700, fontSize: 23, letterSpacing: '0.04em', textTransform: 'uppercase'}}>
      {copy.resonance.place}
    </div>
    <div style={{fontWeight: 600, fontSize: 34, lineHeight: 1.22, marginTop: 12}}>{quote}</div>
    <div style={{display: 'flex', alignItems: 'center', gap: 10, marginTop: 16, fontWeight: 600, fontSize: 21}}>
      <Icon name="lock" size={22} color={color} />
      {copy.resonance.hidden}
    </div>
  </div>
);

export const ResonanceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const slide = progress(frame, 14, 50, ease.inOut);
  const exit = progress(frame, durations.resonance - 14, durations.resonance - 2, ease.in);
  const word = progress(frame, 50, 64);

  const pink: Rect = {x: mix(-W - 40, PINK_END.x, slide), y: PINK_END.y, w: W, h: H};
  const blue: Rect = {x: mix(1080 + 40, BLUE_END.x, slide), y: BLUE_END.y, w: W, h: H};
  const both = intersect(pink, blue);

  const box = (r: Rect, extra: React.CSSProperties = {}): React.CSSProperties => ({
    position: 'absolute',
    left: r.x,
    top: r.y,
    width: r.w,
    height: r.h,
    ...extra,
  });

  return (
    <AbsoluteFill>
      <TextBlock headline={copy.resonance.headline} sub={copy.resonance.sub} headlineSize={100} subSize={38} y={120} exitAt={durations.resonance - 14} />

      <AbsoluteFill style={{transform: `rotate(${ROT}deg) translateY(${exit * 40}px)`, opacity: 1 - exit}}>
        {/* shadows sit under both notes */}
        <div style={box(pink, {boxShadow: '0 24px 50px rgba(22,36,74,0.16)', borderRadius: 6})} />
        <div style={box(blue, {boxShadow: '0 24px 50px rgba(22,36,74,0.16)', borderRadius: 6})} />

        <div style={box(pink, {background: colors.pink, borderRadius: 6, overflow: 'hidden'})}>
          <div style={{position: 'absolute', right: 0, top: 0}}>
            <Halftone width={150} height={110} color={colors.ink} step={14} opacity={0.18} />
          </div>
          <NoteText quote={copy.resonance.pink} color={colors.ink} top={34} />
        </div>
        <div style={box(blue, {background: colors.blue, borderRadius: 6, overflow: 'hidden'})}>
          <div style={{position: 'absolute', left: 0, bottom: 0}}>
            <Halftone width={150} height={110} color={colors.white} step={14} corner="bl" opacity={0.22} />
          </div>
          <NoteText quote={copy.resonance.blue} color={colors.white} top={H - 262} />
        </div>

        {both ? (
          <div
            style={box(both, {
              background: colors.violet,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            <span
              style={{
                fontFamily: fonts.display,
                fontWeight: 800,
                fontSize: 64,
                color: colors.paper,
                opacity: word,
                transform: `scale(${mix(0.9, 1, word)})`,
                whiteSpace: 'nowrap',
              }}
            >
              {copy.resonance.overlap}
            </span>
          </div>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
