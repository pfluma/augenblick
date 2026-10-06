import React from 'react';
import {Img, staticFile} from 'remotion';
import {colors} from '../config/brand';
import {Shot, STATUS_BAR, WEB_TOP_INSET} from '../config/assets';
import {SCREEN} from './Phone';

const AR = 0.4618; // width / height of the supplied screenshots (9:19.5)

// Geometry of a screenshot inside the phone screen (screen pixels).
export const shotBox = (shot: Shot) => {
  if (shot.kind === 'phone') {
    const crop = shot.cropTop ?? STATUS_BAR;
    const h = SCREEN.h / (1 - crop); // the cut image fills the screen height exactly
    const w = h * AR;
    return {left: (SCREEN.w - w) / 2, top: -crop * h, w, h};
  }
  const w = SCREEN.w;
  return {left: 0, top: WEB_TOP_INSET, w, h: w / AR};
};

// A real screenshot, unaltered, framed by the phone screen.
export const Screenshot: React.FC<{shot: Shot}> = ({shot}) => {
  const b = shotBox(shot);
  return (
    <div style={{width: SCREEN.w, height: SCREEN.h, position: 'relative', overflow: 'hidden', background: shot.bg ?? colors.paper}}>
      <Img src={staticFile(shot.src)} style={{position: 'absolute', left: b.left, top: b.top, width: b.w, height: b.h}} />
    </div>
  );
};
