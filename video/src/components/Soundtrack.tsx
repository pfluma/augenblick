import React from 'react';
import {Audio, interpolate, Sequence, staticFile} from 'remotion';
import {music, sfx} from '../config/audio';
import {toFrames, TOTAL} from '../config/timing';

// Music under the whole film (fade in / fade out) plus the short effects at their cues.
export const Soundtrack: React.FC = () => {
  const total = toFrames(TOTAL);
  const fadeIn = toFrames(music.fadeIn);
  const fadeOut = toFrames(music.fadeOut);
  return (
    <>
      {music.src ? (
        <Audio
          src={staticFile(music.src)}
          volume={(f) =>
            music.volume *
            interpolate(f, [0, fadeIn, total - fadeOut, total], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          }
        />
      ) : null}
      {sfx.map((s) =>
        s.src ? (
          <Sequence key={s.name} from={toFrames(s.at)} name={`Ton · ${s.name}`}>
            <Audio src={staticFile(s.src)} volume={s.volume} />
          </Sequence>
        ) : null,
      )}
    </>
  );
};
