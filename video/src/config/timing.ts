// Timing. All numbers in this project are in UNITS of 1/30 s (30 units = 1 second),
// independent of the render frame rate. The video renders at FPS (60) frames per second;
// `useT()` converts the current frame into units, `toFrames()` converts back.
// Change a scene length here and everything after it shifts.

export const FPS = 60;
export const UNIT = FPS / 30; // render frames per timing unit
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const durations = {
  hook: 116, // 3.9 s  Swipen. Swipen. Swipen. → card spins into the phone
  intro: 84, // 2.8 s  Für alle Momente, die fast was geworden wären.
  moment: 184, // 6.1 s  spin → Ort wählen, spin → „Was ist passiert?“, zoom
  resonance: 114, // 3.8 s  zwei Zettel → Resonanz
  table: 150, // 5.0 s  Ein Platz am Tisch, zoom, spin → Events
  safety: 140, // 4.7 s  spin → Schutz, zoom
  connect: 116, // 3.9 s  spin → Verbinden per QR, zoom
  closing: 126, // 4.2 s  Weniger swipen. Mehr erleben.
};

export type SceneName = keyof typeof durations;

export const order = Object.keys(durations) as SceneName[];

export const starts = order.reduce(
  (acc, name, i) => {
    acc[name] = i === 0 ? 0 : acc[order[i - 1]] + durations[order[i - 1]];
    return acc;
  },
  {} as Record<SceneName, number>,
);

export const TOTAL = starts.closing + durations.closing; // in units

export const toFrames = (units: number) => Math.round(units * UNIT);

// at('table', 40) = 40 units into the table scene, at('table', -10) = 10 units before it ends.
export const at = (scene: SceneName, offset = 0) =>
  offset >= 0 ? starts[scene] + offset : starts[scene] + durations[scene] + offset;
