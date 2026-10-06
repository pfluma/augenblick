import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {colors, fonts} from '../config/brand';
import {copy} from '../config/copy';
import {safetyDetail, shots} from '../config/assets';
import {Icon} from '../components/Icon';
import {beats} from '../components/PhoneLayer';
import {screenToCanvas, SCREEN} from '../components/Phone';
import {Screenshot, shotBox} from '../components/Screenshot';
import {ease, mix, progress} from '../motion';
import {POSES} from '../poses';

// A strip of the real screenshot ("Wer darf anfragen? Alle / Nur Frauen") lifts out of
// the phone as a larger card: the close-up. Same pixels, only enlarged.
export const SafetyCallout: React.FC = () => {
  const frame = useCurrentFrame();
  const up = progress(frame, beats.lift, beats.lift + 18, ease.inOut);
  const down = progress(frame, beats.drop, beats.drop + 14, ease.inOut);
  const t = up * (1 - down);
  if (t <= 0) return null;

  const shot = shots[safetyDetail.shot];
  const b = shotBox(shot);
  const y0 = b.top + safetyDetail.from * b.h; // in screen pixels
  const y1 = b.top + safetyDetail.to * b.h;
  const h = y1 - y0;

  const pose = POSES.safety;
  const origin = screenToCanvas(pose, 0, y0);
  const endScale = 1.5;
  const scale = mix(pose.s, endScale, t);
  const endLeft = 540 - (SCREEN.w * endScale) / 2;
  const endTop = origin.y - (h * (endScale - pose.s)) / 2 - 30;
  const left = mix(origin.x, endLeft, t);
  const top = mix(origin.y, endTop, t);
  const tag = progress(frame, beats.lift + 16, beats.lift + 32) * (1 - down);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left,
          top,
          width: SCREEN.w,
          height: h,
          transform: `scale(${scale})`,
          transformOrigin: '0 0',
          borderRadius: 18,
          overflow: 'hidden',
          boxShadow: `0 ${24 * t}px ${50 * t}px rgba(22,36,74,${0.24 * t}), 0 0 0 2px ${colors.inkFaint}`,
        }}
      >
        <div style={{marginTop: -y0}}>
          <Screenshot shot={shot} />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: endTop + h * endScale + 34,
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
    </AbsoluteFill>
  );
};
