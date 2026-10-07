import {useCurrentFrame} from 'remotion';
import {UNIT} from './config/timing';

// Current time in timing units (1/30 s), fractional at 60 fps. Use instead of useCurrentFrame().
export const useT = () => useCurrentFrame() / UNIT;
