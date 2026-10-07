import React from 'react';
import {colors} from '../config/brand';

// Device geometry in canvas pixels at scale 1 (about iPhone proportions, 9:19.5 screen).
export const PHONE = {w: 600, h: 1240, bezel: 16, radius: 92, depth: 26};
export const SCREEN = {
  w: PHONE.w - PHONE.bezel * 2,
  h: PHONE.h - PHONE.bezel * 2,
  radius: PHONE.radius - PHONE.bezel,
};

// Shared camera lens for all 3D elements (phone, hook card, zoom cards, notes).
export const PERSPECTIVE = 2400;

// Where the phone sits: x/y = offset of its centre from the canvas centre, s = scale,
// rx/ry = tilt in degrees (rotateX / rotateY).
export type Pose = {x: number; y: number; s: number; rx: number; ry: number};

export const poseStyle = (p: Pose): React.CSSProperties => ({
  position: 'absolute',
  width: PHONE.w,
  height: PHONE.h,
  left: 540 - PHONE.w / 2 + p.x,
  top: 960 - PHONE.h / 2 + p.y,
  transform: `perspective(${PERSPECTIVE}px) scale(${p.s}) rotateX(${p.rx}deg) rotateY(${p.ry}deg)`,
  transformOrigin: 'center center',
  transformStyle: 'preserve-3d',
});

// Convert a point on the screen (screen pixels from its top-left) to canvas pixels.
// Valid while the phone faces the camera (rx = ry = 0), which is when details zoom out.
export const screenToCanvas = (p: Pose, sx: number, sy: number) => ({
  x: 540 + p.x + (sx + PHONE.bezel - PHONE.w / 2) * p.s,
  y: 960 + p.y + (sy + PHONE.bezel - PHONE.h / 2) * p.s,
});

const EDGE_LAYERS = 10;

// The device: a stack of thin layers behind the front gives it a visible edge when it
// turns. `glare` (0..1) and `glareShift` (-1..1) drive a faint reflection on the glass.
export const Phone: React.FC<{children: React.ReactNode; glare?: number; glareShift?: number}> = ({
  children,
  glare = 0.4,
  glareShift = 0,
}) => (
  <div style={{width: PHONE.w, height: PHONE.h, position: 'relative', transformStyle: 'preserve-3d'}}>
    {Array.from({length: EDGE_LAYERS}).map((_, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: PHONE.radius,
          background: i === EDGE_LAYERS - 1 ? '#0B1022' : '#1E2847',
          transform: `translateZ(${-((i + 1) * PHONE.depth) / EDGE_LAYERS}px)`,
        }}
      />
    ))}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: PHONE.radius,
        background: colors.device,
        padding: PHONE.bezel,
        boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.10)',
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
          isolation: 'isolate',
        }}
      >
        {children}
        {/* glass reflection: one soft diagonal band, wanders with the rotation */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 40,
            pointerEvents: 'none',
            opacity: glare,
            background:
              'linear-gradient(112deg, rgba(255,255,255,0) 38%, rgba(255,255,255,0.16) 47%, rgba(255,255,255,0.05) 53%, rgba(255,255,255,0) 60%)',
            backgroundSize: '300% 100%',
            backgroundPosition: `${50 - glareShift * 45}% 0`,
          }}
        />
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
  </div>
);

// Soft shadow on the "table" below the phone. It is not rotated with the phone; it shifts
// away from the side the phone turns towards and widens when the phone tilts back.
export const PhoneShadow: React.FC<{pose: Pose; opacity: number}> = ({pose, opacity}) => {
  const shiftX = -pose.ry * 4.5;
  const shiftY = 70 + pose.rx * 3;
  const squeeze = Math.cos((pose.ry * Math.PI) / 180);
  return (
    <div
      style={{
        position: 'absolute',
        width: PHONE.w * 0.86,
        height: PHONE.h * 0.9,
        left: 540 + pose.x - (PHONE.w * 0.86) / 2,
        top: 960 + pose.y - (PHONE.h * 0.9) / 2,
        borderRadius: PHONE.radius,
        background: 'rgba(22,36,74,0.30)',
        filter: 'blur(48px)',
        opacity,
        transform: `translate(${shiftX * pose.s}px, ${shiftY * pose.s}px) scale(${pose.s * squeeze}, ${pose.s})`,
      }}
    />
  );
};
