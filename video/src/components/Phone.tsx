import React from 'react';
import {colors} from '../config/brand';

// Device geometry in canvas pixels at scale 1 (about iPhone proportions, 9:19.5 screen).
export const PHONE = {w: 600, h: 1240, bezel: 16, radius: 92};
export const SCREEN = {
  w: PHONE.w - PHONE.bezel * 2,
  h: PHONE.h - PHONE.bezel * 2,
  radius: PHONE.radius - PHONE.bezel,
};

// Where the phone sits: x/y = offset of its centre from the canvas centre, s = scale.
export type Pose = {x: number; y: number; s: number};

export const poseStyle = (p: Pose): React.CSSProperties => ({
  position: 'absolute',
  width: PHONE.w,
  height: PHONE.h,
  left: 540 - PHONE.w / 2 + p.x,
  top: 960 - PHONE.h / 2 + p.y,
  transform: `scale(${p.s})`,
  transformOrigin: 'center center',
});

// Convert a point on the screen (screen pixels from its top-left) to canvas pixels.
export const screenToCanvas = (p: Pose, sx: number, sy: number) => ({
  x: 540 + p.x + (sx + PHONE.bezel - PHONE.w / 2) * p.s,
  y: 960 + p.y + (sy + PHONE.bezel - PHONE.h / 2) * p.s,
});

export const Phone: React.FC<{children: React.ReactNode; shadow?: number}> = ({children, shadow = 1}) => (
  <div
    style={{
      width: PHONE.w,
      height: PHONE.h,
      borderRadius: PHONE.radius,
      background: colors.device,
      padding: PHONE.bezel,
      boxShadow: `0 ${70 * shadow}px ${140 * shadow}px rgba(22,36,74,${0.18 * shadow}), 0 ${18 * shadow}px ${
        36 * shadow
      }px rgba(22,36,74,${0.16 * shadow}), inset 0 0 0 2px rgba(255,255,255,0.08)`,
      position: 'relative',
    }}
  >
    <div
      style={{
        width: SCREEN.w,
        height: SCREEN.h,
        borderRadius: SCREEN.radius,
        overflow: 'hidden',
        position: 'relative',
        background: colors.paper,
        // keeps rounded clipping intact for transformed children
        isolation: 'isolate',
      }}
    >
      {children}
      {/* camera island */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: SCREEN.w / 2 - 62,
          width: 124,
          height: 34,
          borderRadius: 17,
          background: '#05070D',
          zIndex: 50,
        }}
      />
    </div>
  </div>
);
