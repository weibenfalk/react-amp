// Types
import { StateFlags, StateMetrics } from './types';

export const initialStateFlags: StateFlags = {
  isPlaying: false,
  isPaused: false,
  isDragging: false,
  isShuffle: false,
  isRepeat: false,
  isBars: true
};

export const initialStateMetrics: StateMetrics = {
  volume: 1,
  playtime: 0,
  scrubtime: 0,
  totalTime: 0
};
