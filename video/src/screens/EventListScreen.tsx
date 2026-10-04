import React from 'react';
import {colors, fonts} from '../config/brand';
import {ui} from '../config/copy';
import {Icon} from '../components/Icon';
import {LogoMark} from '../components/Logo';
import {SCREEN} from '../components/Phone';
import {Badge, PAD, ScreenBase, StatusBar, swatch} from './common';

// Top of the first event card, in screen pixels (used to aim the tap highlight).
export const FIRST_CARD = {x: PAD, y: 330, w: SCREEN.w - PAD * 2, h: 176};

const tabIcons = ['compass', 'spark', 'table', 'user'];

export const EventListScreen: React.FC<{tap?: number; reveal?: number}> = ({tap = 0, reveal = 1}) => {
  const d = ui.eventList;
  return (
    <ScreenBase id="eventList">
      <StatusBar />
      <div style={{padding: `14px ${PAD}px 0`}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <div>
            <div style={{fontFamily: fonts.text, fontWeight: 600, fontSize: 21, color: colors.inkPale}}>{d.kicker}</div>
            <div
              style={{
                fontFamily: fonts.display,
                fontWeight: 800,
                fontSize: 72,
                lineHeight: 1,
                color: colors.ink,
                marginTop: 4,
              }}
            >
              {d.title}
            </div>
          </div>
          <div style={{marginBottom: 12}}>
            <LogoMark size={38} />
          </div>
        </div>
        <div style={{display: 'flex', gap: 10, marginTop: 24}}>
          {d.chips.map((c, i) => (
            <div
              key={c}
              style={{
                fontFamily: fonts.text,
                fontWeight: 600,
                fontSize: 19,
                padding: '10px 18px',
                borderRadius: 999,
                background: i === 0 ? colors.ink : colors.white,
                color: i === 0 ? colors.white : colors.inkSoft,
                border: i === 0 ? 'none' : `1.5px solid ${colors.line}`,
                whiteSpace: 'nowrap',
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>

      {d.items.map((item, i) => {
        const r = Math.min(1, Math.max(0, reveal * 1.6 - i * 0.2));
        const isTapped = i === 0;
        return (
          <div
            key={item.title}
            style={{
              position: 'absolute',
              left: FIRST_CARD.x,
              top: FIRST_CARD.y + i * (FIRST_CARD.h + 18),
              width: FIRST_CARD.w,
              height: FIRST_CARD.h,
              background: colors.white,
              borderRadius: 26,
              border: `1.5px solid ${isTapped && tap > 0 ? colors.blue : colors.line}`,
              boxShadow: isTapped && tap > 0 ? `0 0 0 ${5 * Math.sin(tap * Math.PI)}px ${colors.blueLight}` : 'none',
              transform: `translateY(${(1 - r) * 40}px) scale(${isTapped ? 1 - 0.025 * Math.sin(tap * Math.PI) : 1})`,
              opacity: r,
              display: 'flex',
              gap: 20,
              padding: 20,
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                width: 104,
                height: '100%',
                borderRadius: 18,
                background: swatch(item.color),
                color: colors.white,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <div style={{fontFamily: fonts.display, fontWeight: 800, fontSize: 46, lineHeight: 1}}>{item.day}</div>
              <div style={{fontFamily: fonts.text, fontWeight: 600, fontSize: 20, marginTop: 6}}>{item.time}</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8, minWidth: 0}}>
              <div style={{fontFamily: fonts.text, fontWeight: 700, fontSize: 27, color: colors.ink, lineHeight: 1.15}}>
                {item.title}
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: 6, color: colors.inkSoft}}>
                <Icon name="pin" size={20} />
                <span style={{fontFamily: fonts.text, fontWeight: 500, fontSize: 21}}>{item.place}</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                <span style={{fontFamily: fonts.text, fontWeight: 600, fontSize: 19, color: colors.blueText}}>
                  {item.seats}
                </span>
                {item.partner ? <Badge size={16}>{ui.place.badge}</Badge> : null}
              </div>
            </div>
          </div>
        );
      })}

      {/* tab bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 118,
          background: colors.white,
          borderTop: `1.5px solid ${colors.line}`,
          display: 'flex',
          justifyContent: 'space-around',
          paddingTop: 16,
        }}
      >
        {d.tabs.map((t, i) => (
          <div
            key={t}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              color: i === 0 ? colors.ink : colors.inkPale,
            }}
          >
            <Icon name={tabIcons[i]} size={28} stroke={i === 0 ? 2.4 : 1.8} />
            <span style={{fontFamily: fonts.text, fontWeight: i === 0 ? 700 : 500, fontSize: 16}}>{t}</span>
          </div>
        ))}
      </div>
    </ScreenBase>
  );
};
