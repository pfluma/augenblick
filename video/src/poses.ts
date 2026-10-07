import {Pose} from './components/Phone';
import {at} from './config/timing';
import {keyframes} from './motion';

// Phone framing per scene: centre offset from canvas centre, scale, tilt (degrees).
// Rules: the top edge stays at y ≥ 620 (headlines above never collide) and the whole
// phone stays inside the frame, except when it deliberately drives out (resonance, closing).
// Whenever a detail zooms out of the screen the phone faces the camera (rx = ry = 0).
const flat = {rx: 0, ry: 0};

export const POSES = {
  enter: {x: 0, y: 193, s: 0.86, rx: 10, ry: 28}, // how it arrives (out of the hook card)
  intro: {x: 0, y: 193, s: 0.86, ...flat}, // top 620, bottom 1686
  introEnd: {x: 0, y: 198, s: 0.85, ...flat},
  moment: {x: 0, y: 201, s: 0.84, ...flat}, // top 640, bottom 1682
  away: {x: 0, y: 1350, s: 0.84, rx: 24, ry: -20}, // tipping out below the frame
  table: {x: 0, y: 201, s: 0.84, ...flat},
  safety: {x: 0, y: 186, s: 0.82, ...flat}, // top 638, bottom 1655
  connect: {x: 0, y: 201, s: 0.84, ...flat},
  out: {x: 0, y: 1450, s: 0.84, rx: 24, ry: 20},
} satisfies Record<string, Pose>;

// A gentle turn between two scenes: the phone swings to `ry` and back to face the camera.
const SWING = 14;
// It also travels from the previous pose to `pose` during the turn.
const swing = (pose: Pose, start: number, dir: 1 | -1) => [
  {f: start + 12, ...pose, ry: SWING * dir},
  {f: start + 26, ...pose},
];

export const cameraAt = (frame: number): Pose & {o: number} =>
  keyframes(frame, [
    {f: 0, ...POSES.enter, o: 0},
    {f: at('hook', -18), ...POSES.enter, o: 0},
    {f: at('hook', -4), ...POSES.enter, o: 1},
    {f: at('intro', 32), ...POSES.intro, o: 1}, // calmly turns to face the camera
    {f: at('intro', -1), ...POSES.introEnd, o: 1},
    ...swing(POSES.moment, at('moment', 0), -1).map((k) => ({...k, o: 1})),
    {f: at('moment', -1), ...POSES.moment, o: 1},
    {f: at('resonance', 20), ...POSES.away, o: 0},
    {f: at('resonance', -1), ...POSES.away, o: 0},
    {f: at('table', 30), ...POSES.table, o: 1}, // comes back up tilted, turns frontal
    {f: at('table', -1), ...POSES.table, o: 1},
    ...swing(POSES.safety, at('safety', 0), 1).map((k) => ({...k, o: 1})),
    {f: at('safety', -1), ...POSES.safety, o: 1},
    ...swing(POSES.connect, at('connect', 0), -1).map((k) => ({...k, o: 1})),
    {f: at('connect', -1), ...POSES.connect, o: 1},
    {f: at('closing', 20), ...POSES.out, o: 0},
  ]);
