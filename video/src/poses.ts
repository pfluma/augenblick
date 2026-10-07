import {Pose} from './components/Phone';
import {at} from './config/timing';
import {keyframes} from './motion';

// Phone framing per scene (centre offset from canvas centre + scale).
// Rules: the top edge stays at y ≥ 620 (headlines above never collide) and the whole
// phone stays inside the frame, except when it deliberately drives out (resonance, closing).
// Close-ups are done by zooming the important spot out of the phone (see DetailZoom).
export const POSES = {
  intro: {x: 0, y: 193, s: 0.86}, // top 620, bottom 1686
  introEnd: {x: 0, y: 196, s: 0.85},
  moment: {x: 0, y: 201, s: 0.84}, // top 640, bottom 1682
  away: {x: 0, y: 1350, s: 0.84}, // below the frame (resonance scene)
  table: {x: 0, y: 201, s: 0.84},
  safety: {x: 0, y: 186, s: 0.82}, // top 638, bottom 1655
  connect: {x: 0, y: 201, s: 0.84},
  out: {x: 0, y: 1450, s: 0.84},
} satisfies Record<string, Pose>;

export const cameraAt = (frame: number): Pose & {o: number} =>
  keyframes(frame, [
    {f: 0, ...POSES.intro, o: 0},
    {f: at('hook', -18), ...POSES.intro, o: 0},
    {f: at('hook', -4), ...POSES.intro, o: 1},
    {f: at('intro', 0), ...POSES.intro, o: 1},
    {f: at('intro', -1), ...POSES.introEnd, o: 1},
    {f: at('moment', 24), ...POSES.moment, o: 1},
    {f: at('moment', -1), ...POSES.moment, o: 1},
    {f: at('resonance', 20), ...POSES.away, o: 0},
    {f: at('resonance', -1), ...POSES.away, o: 0},
    {f: at('table', 28), ...POSES.table, o: 1},
    {f: at('table', -1), ...POSES.table, o: 1},
    {f: at('safety', 20), ...POSES.safety, o: 1},
    {f: at('safety', -1), ...POSES.safety, o: 1},
    {f: at('connect', 20), ...POSES.connect, o: 1},
    {f: at('connect', -1), ...POSES.connect, o: 1},
    {f: at('closing', 18), ...POSES.out, o: 0},
  ]);
