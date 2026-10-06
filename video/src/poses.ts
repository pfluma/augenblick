import {Pose} from './components/Phone';
import {at} from './config/timing';
import {keyframes} from './motion';

// Phone framing per scene (centre offset from canvas centre + scale).
// Rule of thumb: the phone's top edge stays at y ≥ 620 so headlines above never collide.
export const POSES = {
  intro: {x: 0, y: 193, s: 0.86}, // full view (top edge 620)
  introEnd: {x: 0, y: 186, s: 0.875},
  moment: {x: 0, y: 403, s: 1.15}, // close-up on the upper half of the screen (top 650)
  momentEnd: {x: 0, y: 408, s: 1.16},
  away: {x: 0, y: 1350, s: 0.95}, // below the frame (resonance scene)
  table: {x: 0, y: 201, s: 0.84}, // full view (top 640)
  safety: {x: 0, y: 176, s: 0.8}, // full view; detail lifts out as a card (top 640)
  connect: {x: 0, y: 350, s: 1.08}, // closer on the QR code (top 640)
  out: {x: 0, y: 1450, s: 0.95},
} satisfies Record<string, Pose>;

export const cameraAt = (frame: number): Pose & {o: number} =>
  keyframes(frame, [
    {f: 0, ...POSES.intro, o: 0},
    {f: at('hook', -18), ...POSES.intro, o: 0},
    {f: at('hook', -4), ...POSES.intro, o: 1},
    {f: at('intro', 0), ...POSES.intro, o: 1},
    {f: at('intro', -1), ...POSES.introEnd, o: 1},
    {f: at('moment', 30), ...POSES.moment, o: 1},
    {f: at('moment', -1), ...POSES.momentEnd, o: 1},
    {f: at('resonance', 20), ...POSES.away, o: 0},
    {f: at('resonance', -1), ...POSES.away, o: 0},
    {f: at('table', 28), ...POSES.table, o: 1},
    {f: at('table', -1), ...POSES.table, o: 1},
    {f: at('safety', 28), ...POSES.safety, o: 1},
    {f: at('safety', -1), ...POSES.safety, o: 1},
    {f: at('connect', 26), ...POSES.connect, o: 1},
    {f: at('connect', -1), ...POSES.connect, o: 1},
    {f: at('closing', 18), ...POSES.out, o: 0},
  ]);
