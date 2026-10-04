import {Pose} from './components/Phone';
import {at} from './config/timing';
import {keyframes} from './motion';

// Phone framing per scene (centre offset from canvas centre + scale).
export const POSES = {
  intro: {x: 0, y: 193, s: 0.86}, // full product view, room for headline above
  introEnd: {x: 0, y: 186, s: 0.875},
  events: {x: 0, y: 468, s: 1.32}, // close-up on the top of the screen
  eventsEnd: {x: 0, y: 472, s: 1.335},
  safety: {x: 0, y: 176, s: 0.8}, // full view; detail is lifted out as a card
  places: {x: 190, y: 60, s: 0.74}, // wider composition, text beside the phone
  out: {x: 190, y: 1400, s: 0.74},
} satisfies Record<string, Pose>;

export const cameraAt = (frame: number): Pose & {o: number} =>
  keyframes(frame, [
    {f: 0, ...POSES.intro, o: 0},
    {f: at('hook', -18), ...POSES.intro, o: 0},
    {f: at('hook', -4), ...POSES.intro, o: 1},
    {f: at('intro', 0), ...POSES.intro, o: 1},
    {f: at('intro', -1), ...POSES.introEnd, o: 1},
    {f: at('events', 32), ...POSES.events, o: 1},
    {f: at('events', -1), ...POSES.eventsEnd, o: 1},
    {f: at('safety', 30), ...POSES.safety, o: 1},
    {f: at('safety', -1), ...POSES.safety, o: 1},
    {f: at('places', 30), ...POSES.places, o: 1},
    {f: at('places', -1), ...POSES.places, o: 1},
    {f: at('closing', 18), ...POSES.out, o: 0},
  ]);
