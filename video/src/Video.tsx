import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {durations, starts} from './config/timing';
import {Background} from './components/Background';
import {PhoneLayer} from './components/PhoneLayer';
import {ClosingScene} from './scenes/ClosingScene';
import {HookScene} from './scenes/HookScene';
import {PlacesMap} from './scenes/PlacesMap';
import {SafetyCallout} from './scenes/SafetyCallout';
import {EventsText, IntroText, PlacesText, SafetyText} from './scenes/TextScenes';

// Layer order (back → front): background, map, headlines, phone, lifted detail, hook cards, closing.
export const AugenblickVideo: React.FC = () => (
  <AbsoluteFill>
    <Background />

    <Sequence from={starts.places} durationInFrames={durations.places + 30} name="Places · map">
      <PlacesMap />
    </Sequence>

    <Sequence from={starts.intro} durationInFrames={durations.intro} name="Intro · text">
      <IntroText />
    </Sequence>
    <Sequence from={starts.events} durationInFrames={durations.events} name="Events · text">
      <EventsText />
    </Sequence>
    <Sequence from={starts.safety} durationInFrames={durations.safety} name="Safety · text">
      <SafetyText />
    </Sequence>
    <Sequence from={starts.places} durationInFrames={durations.places} name="Places · text">
      <PlacesText />
    </Sequence>

    <PhoneLayer />
    <SafetyCallout />

    <Sequence from={starts.hook} durationInFrames={durations.hook} name="Hook">
      <HookScene />
    </Sequence>
    <Sequence from={starts.closing} durationInFrames={durations.closing} name="Closing">
      <ClosingScene />
    </Sequence>
  </AbsoluteFill>
);
