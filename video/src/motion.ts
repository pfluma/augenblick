import {Easing, interpolate} from 'remotion';

// Shared easing curves so every scene moves with the same character.
export const ease = {
  out: Easing.bezier(0.16, 1, 0.3, 1), // entrances
  inOut: Easing.bezier(0.65, 0, 0.35, 1), // camera moves
  in: Easing.bezier(0.5, 0, 0.75, 0), // exits
};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// 0 → 1 between two frames.
export const progress = (frame: number, start: number, end: number, easing = ease.out) =>
  interpolate(frame, [start, end], [0, 1], {...clamp, easing});

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

// Keyframed values: [{f, ...values}], eased between consecutive keys.
export type Key<T extends string> = {f: number} & Record<T, number>;

export function keyframes<T extends string>(frame: number, keys: Key<T>[], easing = ease.inOut) {
  const props = Object.keys(keys[0]).filter((k) => k !== 'f') as T[];
  const out = {} as Record<T, number>;
  let i = keys.findIndex((k) => k.f > frame);
  if (i === -1) i = keys.length;
  for (const p of props) {
    if (i === 0) out[p] = keys[0][p];
    else if (i === keys.length) out[p] = keys[keys.length - 1][p];
    else {
      const a = keys[i - 1];
      const b = keys[i];
      out[p] = mix(a[p], b[p], progress(frame, a.f, b.f, easing));
    }
  }
  return out;
}
