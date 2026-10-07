import React from 'react';
import {colors} from '../config/brand';
import {copy} from '../config/copy';
import {durations} from '../config/timing';
import {Lockup} from '../components/Logo';
import {TextBlock} from '../components/TextBlock';
import {SPIN} from '../poses';

// Headline blocks. The phone lives in <PhoneLayer/> so it can travel between scenes.
// All blocks sit above y ≈ 610; the phone's top edge stays at 640.
// Texts never move while the phone spins or a screen fades: in scenes that open with a
// screen change they enter after it (delay = SPIN), and they leave before the next one.

export const IntroText: React.FC = () => (
  <TextBlock
    label={<Lockup size={46} />}
    headline={copy.intro.headline}
    sub={copy.intro.sub}
    headlineSize={100}
    subSize={34}
    y={130}
    delay={10} // after the hook spin has landed (intro + 8)
    exitAt={durations.intro - 12}
  />
);

export const MomentText: React.FC = () => (
  <TextBlock
    label={copy.moment.label}
    chip={colors.pink}
    headline={copy.moment.headline}
    sub={copy.moment.sub}
    headlineSize={98}
    subSize={34}
    y={120}
    delay={SPIN}
    exitAt={durations.moment - 12}
  />
);

export const TableText: React.FC = () => (
  <TextBlock
    label={copy.table.label}
    chip={colors.blue}
    headline={copy.table.headline}
    sub={copy.table.sub}
    delay={10}
    exitAt={durations.table - 12}
  />
);

export const SafetyText: React.FC = () => (
  <TextBlock
    label={copy.safety.label}
    chip={colors.blue}
    headline={copy.safety.headline}
    sub={copy.safety.sub}
    delay={SPIN}
    exitAt={durations.safety - 12}
  />
);

export const ConnectText: React.FC = () => (
  <TextBlock
    label={copy.connect.label}
    chip={colors.pink}
    headline={copy.connect.headline}
    sub={copy.connect.sub}
    delay={SPIN}
    exitAt={durations.connect - 10}
  />
);
