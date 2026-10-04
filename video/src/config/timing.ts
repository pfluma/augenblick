// Scene lengths in frames (30 fps). Change a number here and everything after it shifts.
// Animations inside a scene are timed from the scene start (or from its end, for exits),
// so moderate changes keep working; very short scenes may cut animations off.

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const durations = {
  hook: 100, // 3.3 s
  intro: 100, // 3.3 s
  events: 138, // 4.6 s
  safety: 150, // 5.0 s
  places: 126, // 4.2 s
  closing: 138, // 4.6 s
};

export type SceneName = keyof typeof durations;

const order: SceneName[] = ['hook', 'intro', 'events', 'safety', 'places', 'closing'];

export const starts = order.reduce(
  (acc, name, i) => {
    acc[name] = i === 0 ? 0 : acc[order[i - 1]] + durations[order[i - 1]];
    return acc;
  },
  {} as Record<SceneName, number>,
);

export const TOTAL = starts.closing + durations.closing;

// Global frame helper: at('events', 40) = 40 frames into the events scene,
// at('events', -10) = 10 frames before it ends.
export const at = (scene: SceneName, offset = 0) =>
  offset >= 0 ? starts[scene] + offset : starts[scene] + durations[scene] + offset;
