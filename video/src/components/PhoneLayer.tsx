import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {colors} from '../config/brand';
import {shots} from '../config/assets';
import {at} from '../config/timing';
import {ease, progress} from '../motion';
import {cameraAt} from '../poses';
import {Phone, poseStyle, SCREEN} from './Phone';
import {Screenshot} from './Screenshot';

// When each screenshot appears in the phone (global frames). A screen stays until the next one.
// cut = switch without animation (used while the phone is out of frame).
export const screenTimeline: {start: number; shot: keyof typeof shots; cut?: boolean}[] = [
  {start: -1, shot: 'augenblicke'},
  {start: at('moment', 4), shot: 'festhaltenOrt'},
  {start: at('moment', 56), shot: 'festhaltenText'},
  {start: at('resonance', 40), shot: 'amTisch', cut: true},
  {start: at('table', 72), shot: 'events'},
  {start: at('safety', 2), shot: 'tischSchutz'},
  {start: at('connect', 2), shot: 'verbinden'},
];

export const beats = {
  lift: at('safety', 40),
  drop: at('safety', -16),
} as const;

const PUSH = 18;

// Screens slide in from the right (like native navigation); the previous one drifts left and dims.
const Pushed: React.FC<{frame: number; start: number; cutIn?: boolean; next?: number; cutOut?: boolean; children: React.ReactNode}> = ({
  frame,
  start,
  cutIn,
  next,
  cutOut,
  children,
}) => {
  if (frame < start) return null;
  if (next !== undefined && frame >= next + (cutOut ? 0 : PUSH)) return null;
  const inT = start <= 0 || cutIn ? 1 : progress(frame, start, start + PUSH, ease.inOut);
  const outT = next === undefined || cutOut ? 0 : progress(frame, next, next + PUSH, ease.inOut);
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        transform: `translateX(${(1 - inT) * SCREEN.w - outT * SCREEN.w * 0.3}px)`,
        boxShadow: inT < 1 ? '-20px 0 40px rgba(22,36,74,0.18)' : 'none',
      }}
    >
      {children}
      <div style={{position: 'absolute', inset: 0, background: colors.ink, opacity: outT * 0.25}} />
    </div>
  );
};

export const PhoneLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const cam = cameraAt(frame);
  if (cam.o <= 0) return null;
  const lifted = progress(frame, beats.lift, beats.lift + 18) * (1 - progress(frame, beats.drop, beats.drop + 14));

  return (
    <AbsoluteFill style={{opacity: cam.o}}>
      <div style={poseStyle(cam)}>
        <Phone>
          {screenTimeline.map((s, i) => {
            const next = screenTimeline[i + 1];
            return (
              <Pushed key={s.shot} frame={frame} start={s.start} cutIn={s.cut} next={next?.start} cutOut={next?.cut}>
                <Screenshot shot={shots[s.shot]} />
              </Pushed>
            );
          })}
          {/* dims the screen while a detail is lifted out of it */}
          <div style={{position: 'absolute', inset: 0, background: colors.paper, opacity: lifted * 0.5}} />
        </Phone>
      </div>
    </AbsoluteFill>
  );
};
