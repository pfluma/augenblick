import {continueRender, delayRender, staticFile} from 'remotion';
import {fontFiles} from './config/brand';

// Load local font files before the first frame is captured.
const handle = delayRender('Loading fonts');

Promise.all(
  fontFiles.map((f) =>
    new FontFace(f.family, `url(${staticFile(f.file)})`, {weight: f.weight}).load().then((face) => {
      document.fonts.add(face);
    }),
  ),
)
  .then(() => continueRender(handle))
  .catch((err) => {
    console.error(err);
    continueRender(handle);
  });
