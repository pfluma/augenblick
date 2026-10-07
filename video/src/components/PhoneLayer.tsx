import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {colors} from '../config/brand';
import {details, shots} from '../config/assets';
import {at} from '../config/timing';
import {ease, progress} from '../motion';
import {cameraAt} from '../poses';
import {Phone, poseStyle} from './Phone';
import {Screenshot} from './Screenshot';

// When each screenshot appears in the phone (global frames). A screen stays until the next one.
// Screens cross-fade (no sideways push, so nothing ever looks like a half-cut second phone).
// cut = switch without animation (used while the phone is out of frame).
export const screenTimeline: {start: number; shot: keyof typeof shots; cut?: boolean}[] = [
  {start: -1, shot: 'augenblicke'},
  {start: at('moment', 6), shot: 'festhaltenOrt'},
  {start: at('moment', 40), shot: 'festhaltenText'},
  {start: at('resonance', 40), shot: 'amTisch', cut: true},
  {start: at('table', 98), shot: 'events'},
  {start: at('safety', 4), shot: 'tischSchutz'},
  {start: at('connect', 4), shot: 'verbinden'},
];

// Zoom on the important spot of a screen: it lifts out of the phone at `lift`
// (reaches full size 18 frames later) and sinks back at `drop`.
export const zooms: {detail: keyof typeof details; lift: number; drop: number; tag?: boolean}[] = [
  {detail: 'moment', lift: at('moment', 58), drop: at('moment', -16)},
  {detail: 'table', lift: at('table', 32), drop: at('table', 82)},
  {detail: 'safety', lift: at('safety', 34), drop: at('safety', -16), tag: true},
  {detail: 'connect', lift: at('connect', 26), drop: at('connect', -14)},
];

export const zoomAmount = (frame: number, z: (typeof zooms)[number]) =>
  progress(frame, z.lift, z.lift + 18, ease.inOut) * (1 - progress(frame, z.drop, z.drop + 14, ease.inOut));

const FADE = 14;

export const PhoneLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const cam = cameraAt(frame);
  if (cam.o <= 0) return null;
  const dim = Math.max(...zooms.map((z) => zoomAmount(frame, z)));

  return (
    <AbsoluteFill style={{opacity: cam.o}}>
      <div style={poseStyle(cam)}>
        <Phone>
          {screenTimeline.map((s, i) => {
            const next = screenTimeline[i + 1];
            if (frame < s.start) return null;
            // hidden once the next screen has fully faded in on top
            if (next && frame >= next.start + (next.cut ? 0 : FADE)) return null;
            const o = s.start <= 0 || s.cut ? 1 : progress(frame, s.start, s.start + FADE, ease.inOut);
            return (
              <div key={s.shot} style={{position: 'absolute', inset: 0, opacity: o}}>
                <Screenshot shot={shots[s.shot]} />
              </div>
            );
          })}
          {/* dims the screen while a detail is zoomed out of it */}
          <div style={{position: 'absolute', inset: 0, background: colors.paper, opacity: dim * 0.55}} />
        </Phone>
      </div>
    </AbsoluteFill>
  );
};
