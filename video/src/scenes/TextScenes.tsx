import React from 'react';
import {copy} from '../config/copy';
import {durations} from '../config/timing';
import {Lockup} from '../components/Logo';
import {TextBlock} from '../components/TextBlock';

// Headline blocks for the product and feature scenes. The phone itself lives in
// <PhoneLayer/> so it can travel continuously between scenes.

export const IntroText: React.FC = () => (
  <TextBlock
    label={<Lockup size={46} />}
    headline={copy.intro.headline}
    sub={copy.intro.sub}
    delay={6}
    exitAt={durations.intro - 12}
  />
);

export const EventsText: React.FC = () => (
  <TextBlock
    label={copy.events.label}
    headline={copy.events.headline}
    sub={copy.events.sub}
    exitAt={durations.events - 12}
  />
);

export const SafetyText: React.FC = () => (
  <TextBlock
    label={copy.safety.label}
    headline={copy.safety.headline}
    sub={copy.safety.sub}
    exitAt={durations.safety - 12}
  />
);

export const PlacesText: React.FC = () => (
  <TextBlock
    label={copy.places.label}
    headline={copy.places.headline}
    sub={copy.places.sub}
    x={80}
    y={760}
    width={410}
    headlineSize={104}
    subSize={34}
    delay={20}
    exitAt={durations.places - 10}
  />
);
