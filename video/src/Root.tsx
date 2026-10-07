import React from 'react';
import {Composition} from 'remotion';
import './fonts';
import {FPS, HEIGHT, toFrames, TOTAL, WIDTH} from './config/timing';
import {AugenblickVideo} from './Video';

export const RemotionRoot: React.FC = () => (
  <Composition id="Augenblick" component={AugenblickVideo} durationInFrames={toFrames(TOTAL)} fps={FPS} width={WIDTH} height={HEIGHT} />
);
