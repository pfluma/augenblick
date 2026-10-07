import React from 'react';
import {AbsoluteFill} from 'remotion';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {useT} from '../time';
import {colors} from '../config/brand';
import {details, shots} from '../config/assets';
import {at} from '../config/timing';
import {ease, progress} from '../motion';
import {cameraAt, isSpinning, spins, swapAt} from '../poses';
import {Phone, PhoneShadow, poseStyle} from './Phone';
import {Screenshot} from './Screenshot';

// Which screenshot the phone shows. Every change happens in the middle of a spin
// (phone at 180°, only the back visible) – no cross-fades. The table screen is set while
// the phone is out of frame during the resonance scene.
const screenTimeline: {start: number; shot: keyof typeof shots}[] = [
  {start: -Infinity, shot: 'augenblicke'},
  ...spins.filter((s) => s.start < at('resonance', 0)).map((s) => ({start: swapAt(s), shot: s.shot})),
  {start: at('resonance', 40), shot: 'amTisch'},
  ...spins.filter((s) => s.start > at('resonance', 0)).map((s) => ({start: swapAt(s), shot: s.shot})),
];

const shotAt = (frame: number) => [...screenTimeline].reverse().find((s) => frame >= s.start)!.shot;

// Zoom on the important spot of a screen: it lifts out of the phone at `lift`
// (full size 18 units later) and sinks back at `drop`. Never during a spin.
export const zooms: {detail: keyof typeof details; lift: number; drop: number; tag?: boolean}[] = [
  {detail: 'moment', lift: at('moment', 120), drop: at('moment', -16)},
  {detail: 'table', lift: at('table', 34), drop: at('table', 80)},
  {detail: 'safety', lift: at('safety', 54), drop: at('safety', -24), tag: true},
  {detail: 'connect', lift: at('connect', 50), drop: at('connect', -16)},
];

export const zoomAmount = (frame: number, z: (typeof zooms)[number]) =>
  progress(frame, z.lift, z.lift + 18, ease.inOut) * (1 - progress(frame, z.drop, z.drop + 14, ease.inOut));

const PhoneRig: React.FC = () => {
  const frame = useT();
  const cam = cameraAt(frame);
  if (cam.o <= 0) return null;
  const dim = Math.max(...zooms.map((z) => zoomAmount(frame, z)));
  const side = Math.abs(Math.sin((cam.ry * Math.PI) / 180));

  return (
    <AbsoluteFill>
      <PhoneShadow pose={cam} opacity={cam.o} />
      {/* opacity on a wrapper: on the 3D element itself it would flatten the device */}
      <AbsoluteFill style={{opacity: cam.o}}>
        <div style={poseStyle(cam)}>
          <Phone glare={0.35 + 0.65 * side} glareShift={Math.sin((cam.ry * Math.PI) / 180)}>
            <Screenshot shot={shots[shotAt(frame)]} />
            {/* dims the screen while a detail is zoomed out of it */}
            <div style={{position: 'absolute', inset: 0, background: colors.paper, opacity: dim * 0.55}} />
          </Phone>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Motion blur only while the phone spins (keeps the rest sharp and the render fast).
export const PhoneLayer: React.FC = () => {
  const frame = useT();
  if (!isSpinning(frame)) return <PhoneRig />;
  return (
    <CameraMotionBlur shutterAngle={180} samples={6}>
      <PhoneRig />
    </CameraMotionBlur>
  );
};
