import {at} from './timing';
import {HOOK_SPIN, spins} from '../poses';

// Soundtrack. Put the files into /public/audio and set the paths here.
// null = no sound for that slot (the video renders silently without errors).
// All times are in units of 1/30 s, like the rest of the project.

export const music: {src: string | null; volume: number; fadeIn: number; fadeOut: number} = {
  // generated in code by scripts/music.py (own work, no third-party material)
  src: 'audio/musik.mp3',
  volume: 0.9,
  fadeIn: 3, // the track has its own build-up, only a tiny safety fade
  fadeOut: 12, // the final chord already rings out
};

// Short sound effects, placed on the moments that carry the story. Currently unused:
// the generated music already carries these accents (bell on Resonanz, swells, final chord).
export const sfx: {name: string; src: string | null; at: number; volume: number}[] = [
  // whoosh: starts a little before the fastest part of each 360° spin
  {name: 'Drehung Hook', src: null, at: HOOK_SPIN.start + 8, volume: 0.5},
  ...spins.map((s) => ({name: 'Drehung Schutz', src: null, at: s.start + 6, volume: 0.5})),
  // bright tone: the two notes overlap and "Resonanz" appears
  {name: 'Resonanz', src: null, at: at('resonance', 48), volume: 0.6},
  // soft tone: the two circles meet and become the logo
  {name: 'Logo', src: null, at: at('closing', 32), volume: 0.5},
];
