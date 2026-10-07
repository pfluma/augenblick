import {Easing} from 'remotion';
import {Pose} from './components/Phone';
import {at} from './config/timing';
import {keyframes} from './motion';

// ONE pose for every scene: the phone does not drift between scenes. It only moves
// when it spins (screen changes) or deliberately drives out of / back into the frame.
// Top edge at y = 640 (below the headlines), bottom at 1682.
export const POSE: Pose = {x: 0, y: 201, s: 0.84, rx: 0, ry: 0};

const away: Pose = {...POSE, y: 1350, rx: 24, ry: -20}; // tipping out below the frame
const out: Pose = {...POSE, y: 1450, rx: 24, ry: 20};

// ---------------------------------------------------------------------------
// Spins: a full turn around the vertical axis, ONE curve from 0° to 360°
// (slow start, fast middle, soft landing). The screenshot is swapped exactly at 180°,
// when only the back of the phone is visible. Directions alternate.
export const SPIN = 34; // units (1.13 s)
const spinCurve = Easing.bezier(0.55, 0, 0.45, 1); // symmetric: t = 0.5 → 180°

export type Spin = {start: number; dur: number; dir: 1 | -1};

// The hook card turns into the phone with the same kind of spin: the card turns edge-on
// (0° → 90°), then the phone continues (back side, then front with the first screen).
export const HOOK_SPIN: Spin = {start: at('hook', -30), dur: 38, dir: 1};

// Only two spins in the whole film: the hook (above) and Events → Schutz.
export const spins: (Spin & {shot: 'tischSchutz'})[] = [{start: at('safety', 0), dur: SPIN, dir: 1, shot: 'tischSchutz'}];

// All other screen changes: the phone stands still and the new screenshot cross-fades
// in (FADE units, ease-in-out). `at` is the middle of the fade.
export const FADE = 12; // 0.4 s
export const fades: {at: number; shot: 'festhaltenOrt' | 'festhaltenText' | 'events' | 'verbinden'}[] = [
  {at: at('moment', 17), shot: 'festhaltenOrt'},
  {at: at('moment', 101), shot: 'festhaltenText'},
  {at: at('table', 111), shot: 'events'},
  {at: at('connect', 17), shot: 'verbinden'},
];

// Moment the new screenshot appears (phone exactly side-on → back facing the camera).
export const swapAt = (s: Spin) => s.start + s.dur / 2;

const spinState = (frame: number, s: Spin) => {
  if (frame <= s.start || frame >= s.start + s.dur) return null;
  const t = (frame - s.start) / s.dur;
  return {t, angle: s.dir * 360 * spinCurve(t)};
};

export const hookAngle = (frame: number) => {
  if (frame <= HOOK_SPIN.start) return 0;
  if (frame >= HOOK_SPIN.start + HOOK_SPIN.dur) return 360 * HOOK_SPIN.dir;
  return spinState(frame, HOOK_SPIN)!.angle;
};

// true while any spin runs (used to switch motion blur on only when needed)
export const isSpinning = (frame: number, margin = 1) =>
  [HOOK_SPIN, ...spins].some((s) => frame > s.start - margin && frame < s.start + s.dur + margin);

export const cameraAt = (frame: number): Pose & {o: number} => {
  const base = keyframes(frame, [
    {f: 0, ...POSE, o: 1},
    {f: at('resonance', 0), ...POSE, o: 1},
    {f: at('resonance', 20), ...away, o: 0},
    {f: at('resonance', -1), ...away, o: 0},
    {f: at('table', 30), ...POSE, o: 1}, // comes back up tilted, one movement to frontal
    {f: at('closing', 0), ...POSE, o: 1},
    {f: at('closing', 20), ...out, o: 0},
  ]);

  // the phone exists from the moment the hook card is edge-on
  if (frame <= HOOK_SPIN.start) return {...base, o: 0};
  const hook = spinState(frame, HOOK_SPIN);
  const active = hook ?? spins.map((s) => spinState(frame, s)).find(Boolean) ?? null;
  if (!active) return base;
  const dip = 1 - 0.05 * Math.sin(Math.PI * active.t); // ~95 % at the fastest point
  return {
    ...base,
    ry: base.ry + active.angle,
    s: base.s * dip,
    o: hook && Math.abs(active.angle) < 90 ? 0 : base.o,
  };
};
