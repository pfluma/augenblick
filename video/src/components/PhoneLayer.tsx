import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {colors} from '../config/brand';
import {at} from '../config/timing';
import {ease, progress} from '../motion';
import {cameraAt} from '../poses';
import {EventDetailScreen} from '../screens/EventDetailScreen';
import {EventListScreen, FIRST_CARD} from '../screens/EventListScreen';
import {PlaceScreen} from '../screens/PlaceScreen';
import {SafetyScreen} from '../screens/SafetyScreen';
import {Phone, poseStyle, SCREEN} from './Phone';

// Moments inside the phone, in global frames.
export const beats = {
  listReveal: [at('hook', -16), at('intro', 22)],
  tap: at('events', 38),
  toDetail: at('events', 48),
  press: at('events', 90),
  toSafety: at('safety', 4),
  lift: at('safety', 34),
  toggle: at('safety', 60),
  drop: at('safety', -16),
  toPlace: at('places', 4),
  pin: at('places', 26),
} as const;

const PUSH = 18;

// Screens slide in from the right (like native navigation); the previous one
// drifts left and dims.
const Pushed: React.FC<{frame: number; start: number; next?: number; children: React.ReactNode}> = ({
  frame,
  start,
  next,
  children,
}) => {
  if (frame < start) return null;
  if (next !== undefined && frame > next + PUSH) return null;
  const inT = start <= 0 ? 1 : progress(frame, start, start + PUSH, ease.inOut);
  const outT = next === undefined ? 0 : progress(frame, next, next + PUSH, ease.inOut);
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        transform: `translateX(${(1 - inT) * SCREEN.w - outT * SCREEN.w * 0.3}px)`,
        boxShadow: inT < 1 ? '-20px 0 40px rgba(22,36,74,0.18)' : 'none',
      }}
    >
      {children}
      <div style={{position: 'absolute', inset: 0, background: colors.ink, opacity: outT * 0.25}} />
    </div>
  );
};

export const PhoneLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const cam = cameraAt(frame);
  if (cam.o <= 0) return null;

  const reveal = progress(frame, beats.listReveal[0], beats.listReveal[1]);
  const tap = progress(frame, beats.tap, beats.tap + 14, ease.inOut);
  const press = progress(frame, beats.press, beats.press + 10, ease.inOut);
  const joined = progress(frame, beats.press + 6, beats.press + 16);
  const lifted = progress(frame, beats.lift, beats.lift + 18) * (1 - progress(frame, beats.drop, beats.drop + 14));
  const toggle = progress(frame, beats.toggle, beats.toggle + 10, ease.inOut);
  const pin = progress(frame, beats.pin, beats.pin + 14);
  const pulse = frame > beats.pin + 10 ? ((frame - beats.pin - 10) % 36) / 36 : 0;

  // touch indicator on the first event card
  const touch = progress(frame, beats.tap - 4, beats.tap + 4) * (1 - progress(frame, beats.tap + 12, beats.tap + 20));
  const touchX = FIRST_CARD.x + FIRST_CARD.w * 0.62;
  const touchY = FIRST_CARD.y + FIRST_CARD.h * 0.5;

  return (
    <AbsoluteFill style={{opacity: cam.o}}>
      <div style={poseStyle(cam)}>
        <Phone>
          <Pushed frame={frame} start={-1} next={beats.toDetail}>
            <EventListScreen tap={tap} reveal={reveal} />
            <div
              style={{
                position: 'absolute',
                left: touchX - 40,
                top: touchY - 40,
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: colors.ink,
                opacity: touch * 0.18,
                transform: `scale(${0.6 + touch * 0.4})`,
              }}
            />
          </Pushed>
          <Pushed frame={frame} start={beats.toDetail} next={beats.toSafety}>
            <EventDetailScreen press={press} joined={joined} />
          </Pushed>
          <Pushed frame={frame} start={beats.toSafety} next={beats.toPlace}>
            <SafetyScreen toggle={toggle} lifted={lifted} />
            <div style={{position: 'absolute', inset: 0, background: colors.paper, opacity: lifted * 0.45}} />
          </Pushed>
          <Pushed frame={frame} start={beats.toPlace}>
            <PlaceScreen pin={pin} pulse={pulse} />
          </Pushed>
        </Phone>
      </div>
    </AbsoluteFill>
  );
};
