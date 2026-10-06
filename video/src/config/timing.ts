// Scene lengths in frames (30 fps). Change a number here and everything after it shifts.
// Animations inside a scene are timed from the scene start (or from its end, for exits),
// so moderate changes keep working; very short scenes may cut animations off.

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const durations = {
  hook: 100, // 3.3 s  Swipen. Swipen. Swipen.
  intro: 90, // 3.0 s  Für alle Momente, die fast was geworden wären.
  moment: 105, // 3.5 s  Augenblick festhalten
  resonance: 120, // 4.0 s  zwei Zettel → Resonanz
  table: 132, // 4.4 s  Ein Platz am Tisch / Events
  safety: 120, // 4.0 s  Schutz
  connect: 90, // 3.0 s  Verbinden per QR
  closing: 140, // 4.7 s  Weniger swipen. Mehr erleben.
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

export const TOTAL = starts.closing + durations.closing;

// Global frame helper: at('table', 40) = 40 frames into the table scene,
// at('table', -10) = 10 frames before it ends.
export const at = (scene: SceneName, offset = 0) =>
  offset >= 0 ? starts[scene] + offset : starts[scene] + durations[scene] + offset;
