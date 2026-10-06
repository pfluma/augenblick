import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {durations, starts} from './config/timing';
import {Background} from './components/Background';
import {PhoneLayer} from './components/PhoneLayer';
import {ClosingScene} from './scenes/ClosingScene';
import {HookScene} from './scenes/HookScene';
import {ResonanceScene} from './scenes/ResonanceScene';
import {SafetyCallout} from './scenes/SafetyCallout';
import {ConnectText, IntroText, MomentText, SafetyText, TableText} from './scenes/TextScenes';

// Layer order (back → front): paper, headlines, phone, lifted detail, notes, hook cards, closing.
export const AugenblickVideo: React.FC = () => (
  <AbsoluteFill>
    <Background />

    <Sequence from={starts.intro} durationInFrames={durations.intro} name="Intro · text">
      <IntroText />
    </Sequence>
    <Sequence from={starts.moment} durationInFrames={durations.moment} name="Augenblicke · text">
      <MomentText />
    </Sequence>
    <Sequence from={starts.table} durationInFrames={durations.table} name="Tisch · text">
      <TableText />
    </Sequence>
    <Sequence from={starts.safety} durationInFrames={durations.safety} name="Schutz · text">
      <SafetyText />
    </Sequence>
    <Sequence from={starts.connect} durationInFrames={durations.connect} name="Verbinden · text">
      <ConnectText />
    </Sequence>

    <PhoneLayer />
    <SafetyCallout />

    <Sequence from={starts.resonance} durationInFrames={durations.resonance} name="Resonanz">
      <ResonanceScene />
    </Sequence>
    <Sequence from={starts.hook} durationInFrames={durations.hook} name="Hook">
      <HookScene />
    </Sequence>
    <Sequence from={starts.closing} durationInFrames={durations.closing} name="Closing">
      <ClosingScene />
    </Sequence>
  </AbsoluteFill>
);
