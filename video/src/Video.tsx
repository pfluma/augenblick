import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {durations, starts, toFrames} from './config/timing';
import {Background} from './components/Background';
import {PhoneLayer} from './components/PhoneLayer';
import {ClosingScene} from './scenes/ClosingScene';
import {HookScene} from './scenes/HookScene';
import {ResonanceScene} from './scenes/ResonanceScene';
import {DetailZoom} from './scenes/DetailZoom';
import {ConnectText, IntroText, MomentText, SafetyText, TableText} from './scenes/TextScenes';

// Layer order (back → front): paper, headlines, phone, zoomed details, notes, hook cards, closing.
export const AugenblickVideo: React.FC = () => (
  <AbsoluteFill>
    <Background />

    <Sequence from={toFrames(starts.intro)} durationInFrames={toFrames(durations.intro)} name="Intro · text">
      <IntroText />
    </Sequence>
    <Sequence from={toFrames(starts.moment)} durationInFrames={toFrames(durations.moment)} name="Augenblicke · text">
      <MomentText />
    </Sequence>
    <Sequence from={toFrames(starts.table)} durationInFrames={toFrames(durations.table)} name="Tisch · text">
      <TableText />
    </Sequence>
    <Sequence from={toFrames(starts.safety)} durationInFrames={toFrames(durations.safety)} name="Schutz · text">
      <SafetyText />
    </Sequence>
    <Sequence from={toFrames(starts.connect)} durationInFrames={toFrames(durations.connect)} name="Verbinden · text">
      <ConnectText />
    </Sequence>

    <PhoneLayer />
    <DetailZoom />

    <Sequence from={toFrames(starts.resonance)} durationInFrames={toFrames(durations.resonance)} name="Resonanz">
      <ResonanceScene />
    </Sequence>
    <Sequence from={toFrames(starts.hook)} durationInFrames={toFrames(durations.hook)} name="Hook">
      <HookScene />
    </Sequence>
    <Sequence from={toFrames(starts.closing)} durationInFrames={toFrames(durations.closing)} name="Closing">
      <ClosingScene />
    </Sequence>
  </AbsoluteFill>
);
