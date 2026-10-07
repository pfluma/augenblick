import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useT} from '../time';
import {colors, fonts, tints} from '../config/brand';
import {copy} from '../config/copy';
import {durations} from '../config/timing';
import {PERSPECTIVE, SCREEN} from '../components/Phone';
import {ease, mix, progress} from '../motion';
import {hookAngle, POSE} from '../poses';

// Swipe cards fly off faster and faster; the last one stays and spins into the phone:
// it grows to the screen size while turning edge-on (0° → 90°), then the phone takes over.
const SWIPES = [6, 18, 28, 37, 45]; // local frames
const DIRS = [-1, 1, -1, -1, 1];
const TINTS = [tints.blue, tints.pink, tints.blue, tints.pink, tints.blue, tints.pink];

const CARD_W = SCREEN.w * POSE.s;
const CARD_H = 690;
const CENTER = {x: 540 + POSE.x, y: 960 + POSE.y};

const ProfileCard: React.FC<{tint: string; fade?: number}> = ({tint, fade = 0}) => (
  <div style={{position: 'absolute', inset: 0, opacity: 1 - fade}}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(180deg, ${tint} 0%, ${tint} 68%, ${colors.white} 68%)`,
      }}
    />
    {/* anonymous silhouette, no faces */}
    <svg viewBox="0 0 200 200" style={{position: 'absolute', left: '22%', width: '56%', top: '16%'}}>
      <circle cx="100" cy="72" r="38" fill={colors.white} opacity={0.75} />
      <path d="M30 200c4-48 34-72 70-72s66 24 70 72Z" fill={colors.white} opacity={0.75} />
    </svg>
    <div style={{position: 'absolute', left: 32, bottom: 92, width: '52%', height: 22, borderRadius: 11, background: colors.inkFaint}} />
    <div style={{position: 'absolute', left: 32, bottom: 52, width: '32%', height: 18, borderRadius: 9, background: colors.inkFaint, opacity: 0.6}} />
  </div>
);

export const HookScene: React.FC = () => {
  const frame = useT();
  // text only fades (no movement) while the card spins
  const exit = progress(frame, durations.hook - 14, durations.hook - 2, ease.in);
  const angle = hookAngle(frame);
  const morph = Math.min(1, Math.abs(angle) / 90);

  const swiped = SWIPES.filter((s) => frame >= s).length; // cards gone or leaving
  const question = progress(frame, 42, 56);

  return (
    <AbsoluteFill>
      {/* text */}
      <div style={{position: 'absolute', left: 80, top: 108, opacity: 1 - exit}}>
        <div style={{fontFamily: fonts.display, fontWeight: 800, fontSize: 110, lineHeight: 0.92, color: colors.ink}}>
          {copy.hook.words.map((w, i) => {
            const t = progress(frame, SWIPES[i], SWIPES[i] + 10);
            const dim = mix(1, 0.28, progress(frame, 40, 54));
            return (
              <div key={i} style={{overflow: 'hidden', paddingBottom: '0.06em', marginBottom: '-0.06em'}}>
                <div style={{transform: `translateX(${(1 - t) * -40}px)`, opacity: t * dim}}>{w}</div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 70,
            lineHeight: 1.14,
            color: colors.ink, // ink on pink, always
            marginTop: 22,
            opacity: question,
            transform: `translateY(${(1 - question) * 20}px)`,
          }}
        >
          {copy.hook.question.map((l) => (
            <div key={l}>
              <span style={{background: colors.pink, padding: '0 14px', marginLeft: -14}}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* card stack, back to front */}
      {TINTS.map((tint, i) => {
        const isLast = i === TINTS.length - 1;
        const depth = Math.max(0, i - swiped);
        // smooth depth: how far this card has advanced towards the front
        const advance = SWIPES.reduce((acc, s, k) => (k < i ? acc + progress(frame, s, s + 8) : acc), 0);
        const d = Math.max(0, i - advance);
        const leave = isLast ? 0 : progress(frame, SWIPES[i], SWIPES[i] + 9, ease.in);
        if (leave >= 1) return null;
        if (isLast && morph >= 1) return null; // edge-on: the phone continues the turn
        if (depth > 3) return null;
        const scale = 1 - Math.min(d, 3) * 0.05;
        const w = isLast ? mix(CARD_W, SCREEN.w * POSE.s, morph) : CARD_W;
        const h = isLast ? mix(CARD_H, SCREEN.h * POSE.s, morph) : CARD_H;
        const radius = isLast ? mix(34, SCREEN.radius * POSE.s, morph) : 34;
        const dir = DIRS[i] ?? -1;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: w,
              height: h,
              left: CENTER.x - w / 2,
              top: CENTER.y - h / 2,
              borderRadius: radius,
              overflow: 'hidden',
              background: colors.white,
              zIndex: 10 - i,
              opacity: 1 - Math.max(0, d - 2.2),
              boxShadow: `0 ${30 - d * 8}px ${60 - d * 12}px rgba(22,36,74,${0.16 - d * 0.03})`,
              transform: isLast
                ? `perspective(${PERSPECTIVE}px) translateY(${d * 34}px) scale(${scale}) rotateY(${angle}deg)`
                : `translate(${dir * leave * 900}px, ${d * 34 + leave * 60}px) rotate(${dir * leave * 16}deg) scale(${scale})`,
              transformOrigin: isLast ? '50% 50%' : '50% 100%',
            }}
          >
            <ProfileCard tint={tint} />
          </div>
        );
      }).reverse()}
    </AbsoluteFill>
  );
};
