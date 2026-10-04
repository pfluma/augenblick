import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {colors, fonts} from '../config/brand';
import {copy, ui} from '../config/copy';
import {Icon} from '../components/Icon';
import {beats} from '../components/PhoneLayer';
import {screenToCanvas} from '../components/Phone';
import {ease, mix, progress} from '../motion';
import {POSES} from '../poses';
import {PAD} from '../screens/common';
import {SAFETY_FOCUS_ROW, SAFETY_ROW_H, SAFETY_ROW_W, SAFETY_ROWS_Y, SafetyRow} from '../screens/SafetyScreen';

// The "Nur Frauen" row lifts out of the phone as a larger card: the close-up detail.
// Uses global frames (rendered outside any Sequence).
export const SafetyCallout: React.FC = () => {
  const frame = useCurrentFrame();
  const up = progress(frame, beats.lift, beats.lift + 18, ease.inOut);
  const down = progress(frame, beats.drop, beats.drop + 14, ease.inOut);
  const t = up * (1 - down);
  if (t <= 0) return null;

  const pose = POSES.safety;
  const origin = screenToCanvas(pose, PAD, SAFETY_ROWS_Y + SAFETY_ROW_H * SAFETY_FOCUS_ROW);
  const startScale = pose.s;
  const endScale = 1.48;
  const scale = mix(startScale, endScale, t);
  const endLeft = 540 - (SAFETY_ROW_W * endScale) / 2;
  const endTop = origin.y - 40;
  const left = mix(origin.x, endLeft, t);
  const top = mix(origin.y, endTop, t);

  const toggle = progress(frame, beats.toggle, beats.toggle + 10, ease.inOut);
  const tag = progress(frame, beats.toggle + 8, beats.toggle + 24) * (1 - down);
  const row = ui.safety.rows[SAFETY_FOCUS_ROW];

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left,
          top,
          width: SAFETY_ROW_W,
          height: SAFETY_ROW_H,
          transform: `scale(${scale})`,
          transformOrigin: '0 0',
          borderRadius: 22,
          overflow: 'hidden',
          background: colors.white,
          boxShadow: `0 ${24 * t}px ${50 * t}px rgba(22,36,74,${0.22 * t}), 0 0 0 ${1.5}px ${colors.line}`,
        }}
      >
        <SafetyRow row={row} toggle={toggle} last highlight />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: endTop + SAFETY_ROW_H * endScale + 34,
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
            color: colors.white,
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
