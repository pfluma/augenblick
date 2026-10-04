import React from 'react';
import {colors, fonts} from '../config/brand';
import {ui} from '../config/copy';
import {Icon} from '../components/Icon';
import {SCREEN} from '../components/Phone';
import {PAD, ScreenBase, StatusBar, Toggle} from './common';

export const SAFETY_ROWS_Y = 356;
export const SAFETY_ROW_H = 108;
export const SAFETY_FOCUS_ROW = 2; // "Nur Frauen"
export const SAFETY_ROW_W = SCREEN.w - PAD * 2;

type RowData = (typeof ui.safety.rows)[number];

export const SafetyRow: React.FC<{row: RowData; toggle?: number; last?: boolean; highlight?: boolean}> = ({
  row,
  toggle = 1,
  last,
  highlight,
}) => (
  <div
    style={{
      width: SAFETY_ROW_W,
      height: SAFETY_ROW_H,
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      padding: '0 22px',
      boxSizing: 'border-box',
      borderBottom: last ? 'none' : `1.5px solid ${colors.line}`,
      background: highlight ? colors.white : 'transparent',
    }}
  >
    <div
      style={{
        width: 50,
        height: 50,
        borderRadius: 14,
        background: row.control === 'toggle' ? colors.pinkLight : colors.paper,
        color: row.control === 'toggle' ? colors.pinkText : colors.ink,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Icon name={row.icon} size={28} />
    </div>
    <div style={{flex: 1, minWidth: 0}}>
      <div style={{fontFamily: fonts.text, fontWeight: 700, fontSize: 24, color: colors.ink, lineHeight: 1.2}}>{row.title}</div>
      <div style={{fontFamily: fonts.text, fontWeight: 500, fontSize: 19, color: colors.inkPale, marginTop: 4, lineHeight: 1.25}}>
        {row.sub}
      </div>
    </div>
    {row.control === 'toggle' ? <Toggle on={toggle} /> : null}
    {row.control === 'off' ? <Toggle on={0} /> : null}
    {row.control === 'always' ? (
      <div style={{display: 'flex', alignItems: 'center', gap: 4, color: colors.blueText, fontFamily: fonts.text, fontWeight: 600, fontSize: 18}}>
        <Icon name="check" size={22} stroke={2.6} />
        {ui.safety.always}
      </div>
    ) : null}
    {row.control === 'chevron' ? <Icon name="chevronRight" size={26} color={colors.inkPale} /> : null}
  </div>
);

export const SafetyScreen: React.FC<{toggle?: number; lifted?: number}> = ({toggle = 1, lifted = 0}) => {
  const d = ui.safety;
  return (
    <ScreenBase id="safety">
      <StatusBar />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          padding: `4px ${PAD - 6}px 0`,
          height: 56,
          color: colors.blueText,
          fontFamily: fonts.text,
          fontWeight: 600,
          fontSize: 23,
        }}
      >
        <Icon name="chevronLeft" size={30} stroke={2.4} />
        {d.back}
      </div>
      <div style={{padding: `14px ${PAD}px 0`}}>
        <div style={{fontFamily: fonts.display, fontWeight: 800, fontSize: 64, lineHeight: 0.98, color: colors.ink}}>
          {d.title.map((l) => (
            <div key={l}>{l}</div>
          ))}
        </div>
        <div style={{fontFamily: fonts.text, fontWeight: 500, fontSize: 22, color: colors.inkSoft, marginTop: 12}}>{d.intro}</div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: SAFETY_ROWS_Y,
          left: PAD,
          width: SAFETY_ROW_W,
          background: colors.white,
          borderRadius: 24,
          border: `1.5px solid ${colors.line}`,
          overflow: 'hidden',
        }}
      >
        {d.rows.map((row, i) => (
          <div key={row.title} style={{opacity: i === SAFETY_FOCUS_ROW ? 1 - lifted * 0.85 : 1}}>
            <SafetyRow row={row} toggle={toggle} last={i === d.rows.length - 1} />
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          top: SAFETY_ROWS_Y + SAFETY_ROW_H * d.rows.length + 30,
          left: PAD + 6,
          right: PAD,
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          color: colors.inkPale,
          fontFamily: fonts.text,
          fontWeight: 500,
          fontSize: 19,
          lineHeight: 1.3,
        }}
      >
        <Icon name="database" size={26} />
        {d.footnote}
      </div>
    </ScreenBase>
  );
};
