import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useT} from '../time';
import {colors, fonts} from '../config/brand';
import {copy} from '../config/copy';
import {details, shots} from '../config/assets';
import {Icon} from '../components/Icon';
import {zoomAmount, zooms} from '../components/PhoneLayer';
import {PERSPECTIVE, screenToCanvas, SCREEN} from '../components/Phone';
import {Screenshot, shotBox} from '../components/Screenshot';
import {mix, progress} from '../motion';
import {cameraAt} from '../poses';

const END_SCALE = 1.75; // 568 px screen width → 994 px on canvas
const SAFE_TOP = 640; // below the headlines
const SAFE_BOTTOM = 1860;
const TAG_SPACE = 120;

// The important strip of the real screenshot zooms out of the phone, from exactly where it
// sits on the screen, to a readable size. Same pixels, only enlarged. Global frames.
export const DetailZoom: React.FC = () => {
  const frame = useT();
  return (
    <AbsoluteFill>
      {zooms.map((z) => {
        const t = zoomAmount(frame, z);
        if (t <= 0) return null;
        const d = details[z.detail];
        const shot = shots[d.shot];
        const b = shotBox(shot);
        const y0 = b.top + d.from * b.h; // screen pixels
        const h = (d.to - d.from) * b.h;

        const pose = cameraAt(z.lift);
        const origin = screenToCanvas(pose, 0, y0);
        const hEnd = h * END_SCALE;
        const centre = origin.y + (h * pose.s) / 2;
        const maxBottom = SAFE_BOTTOM - (z.tag ? TAG_SPACE : 0);
        const endCentre = Math.min(Math.max(centre, SAFE_TOP + hEnd / 2), maxBottom - hEnd / 2);
        const endTop = endCentre - hEnd / 2;
        const endLeft = 540 - (SCREEN.w * END_SCALE) / 2;

        const scale = mix(pose.s, END_SCALE, t);
        const left = mix(origin.x, endLeft, t);
        const top = mix(origin.y, endTop, t);
        // centre of the card, so the 3D tilt pivots around its middle
        const cx = left + (SCREEN.w * scale) / 2;
        const cy = top + (h * scale) / 2;
        // leaning forward out of the screen: tilt peaks halfway, flat when fully out (readable)
        const lean = 4 * t * (1 - t);
        const tag = z.tag ? progress(frame, z.lift + 14, z.lift + 30) * Math.min(1, t * 1.5) : 0;

        return (
          <React.Fragment key={z.detail}>
            <div
              style={{
                position: 'absolute',
                left: cx - SCREEN.w / 2,
                top: cy - h / 2,
                width: SCREEN.w,
                height: h,
                transform: `perspective(${PERSPECTIVE}px) scale(${scale}) rotateX(${lean * 16}deg) rotateY(${lean * -7}deg)`,
                transformOrigin: 'center center',
                borderRadius: 14,
                overflow: 'hidden',
                boxShadow: `0 ${20 * t}px ${44 * t}px rgba(22,36,74,${0.24 * t}), 0 0 0 1.5px ${colors.inkFaint}`,
              }}
            >
              <div style={{marginTop: -y0}}>
                <Screenshot shot={shot} />
              </div>
            </div>
            {z.tag ? (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: endTop + hEnd + 30,
                  display: 'flex',
                  justifyContent: 'center',
                  opacity: tag,
                  transform: `translateY(${(1 - tag) * 16}px)`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    background: colors.ink,
                    color: colors.paper,
                    borderRadius: 999,
                    padding: '18px 30px 18px 24px',
                    fontFamily: fonts.text,
                    fontWeight: 600,
                    fontSize: 32,
                    boxShadow: '0 16px 30px rgba(22,36,74,0.25)',
                  }}
                >
                  <Icon name="database" size={34} />
                  {copy.safety.tag}
                </div>
              </div>
            ) : null}
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
