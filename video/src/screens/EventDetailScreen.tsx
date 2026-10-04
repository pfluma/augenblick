import React from 'react';
import {colors, fonts} from '../config/brand';
import {ui} from '../config/copy';
import {Icon} from '../components/Icon';
import {SCREEN} from '../components/Phone';
import {mix} from '../motion';
import {Badge, PAD, ScreenBase, StatusBar} from './common';

export const DETAIL_BUTTON = {x: PAD, y: 868, w: SCREEN.w - PAD * 2, h: 84};

// A round table with seats: filled = taken, outlined = still free.
const Table: React.FC<{taken: number; total: number; joined: number}> = ({taken, total, joined}) => {
  const R = 96;
  const cx = 150;
  const cy = 150;
  return (
    <svg width={300} height={300} viewBox="0 0 300 300">
      <circle cx={cx} cy={cy} r={62} fill={colors.white} />
      {Array.from({length: total}).map((_, i) => {
        const a = (i / total) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(a) * R;
        const y = cy + Math.sin(a) * R;
        const isTaken = i < taken;
        const isMine = i === taken; // the seat that fills when you join
        const fills = [colors.sky, colors.violet, colors.blue];
        if (isTaken) return <circle key={i} cx={x} cy={y} r={22} fill={fills[i % 3]} />;
        if (isMine)
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={22} fill="none" stroke={colors.ink} strokeWidth={2.5} strokeDasharray="5 6" opacity={1 - joined} />
              <circle cx={x} cy={y} r={22 * joined} fill={colors.pink} />
            </g>
          );
        return <circle key={i} cx={x} cy={y} r={22} fill="none" stroke={colors.ink} strokeWidth={2.5} strokeDasharray="5 6" opacity={0.55} />;
      })}
    </svg>
  );
};

const Row: React.FC<{icon: string; children: React.ReactNode}> = ({icon, children}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 16, height: 52}}>
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        background: colors.white,
        border: `1.5px solid ${colors.line}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.ink,
      }}
    >
      <Icon name={icon} size={24} />
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: 12, fontFamily: fonts.text, fontWeight: 600, fontSize: 24, color: colors.ink}}>
      {children}
    </div>
  </div>
);

export const EventDetailScreen: React.FC<{press?: number; joined?: number}> = ({press = 0, joined = 0}) => {
  const d = ui.eventDetail;
  const free = d.seatsTotal - d.seatsTaken - (joined > 0.5 ? 1 : 0);
  const btnBg = joined > 0.5 ? colors.blue : colors.ink;
  return (
    <ScreenBase id="eventDetail">
      <StatusBar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: `4px ${PAD - 6}px 0`,
          color: colors.blueText,
          height: 56,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 2, fontFamily: fonts.text, fontWeight: 600, fontSize: 23}}>
          <Icon name="chevronLeft" size={30} stroke={2.4} />
          {d.back}
        </div>
        <Icon name="share" size={28} color={colors.ink} />
      </div>

      <div
        style={{
          margin: `12px ${PAD}px 0`,
          height: 300,
          borderRadius: 30,
          background: colors.pinkLight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Table taken={d.seatsTaken} total={d.seatsTotal} joined={joined} />
      </div>

      <div style={{padding: `26px ${PAD}px 0`}}>
        <div
          style={{
            fontFamily: fonts.text,
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: colors.pinkText,
          }}
        >
          {d.kicker}
        </div>
        <div style={{fontFamily: fonts.display, fontWeight: 800, fontSize: 62, lineHeight: 1, color: colors.ink, marginTop: 8}}>
          {d.title}
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 10, marginTop: 22}}>
          <Row icon="calendar">{d.when}</Row>
          <Row icon="pin">
            {d.where} <Badge size={16}>{ui.place.badge}</Badge>
          </Row>
          <Row icon="people">
            <span style={{color: colors.blueText}}>{d.seats(free, d.seatsTotal)}</span>
          </Row>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: DETAIL_BUTTON.x,
          top: DETAIL_BUTTON.y,
          width: DETAIL_BUTTON.w,
          height: DETAIL_BUTTON.h,
          borderRadius: 999,
          background: btnBg,
          color: colors.white,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          fontFamily: fonts.text,
          fontWeight: 700,
          fontSize: 28,
          transform: `scale(${mix(1, 0.95, Math.sin(press * Math.PI))})`,
        }}
      >
        {joined > 0.5 ? (
          <>
            <Icon name="check" size={30} stroke={3} />
            {d.ctaDone}
          </>
        ) : (
          d.cta
        )}
      </div>
      <div
        style={{
          position: 'absolute',
          top: DETAIL_BUTTON.y + DETAIL_BUTTON.h + 26,
          left: PAD,
          right: PAD,
          textAlign: 'center',
          fontFamily: fonts.text,
          fontWeight: 500,
          fontSize: 21,
          color: colors.inkPale,
        }}
      >
        {d.description}
      </div>
    </ScreenBase>
  );
};

export const DETAIL_HEIGHT = SCREEN.h;
