// Render review stills: node scripts/stills.mjs 40 150 400 ...
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';

const frames = process.argv.slice(2).map(Number);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const browserExecutable = process.env.REMOTION_BROWSER ?? null;
const composition = await selectComposition({serveUrl, id: 'Augenblick', browserExecutable});
for (const frame of frames) {
  await renderStill({composition, serveUrl, frame, output: `${process.env.STILLS_DIR ?? 'out/stills'}/f${String(frame).padStart(3, '0')}.png`, browserExecutable});
  console.log('frame', frame);
}
