export interface StateFlags {
  isPlaying: boolean;
  isPaused: boolean;
  isDragging: boolean;
  isShuffle: boolean;
  isRepeat: boolean;
  isBars: boolean;
};

export interface StateMetrics {
  volume: number;
  playtime: number;
  scrubtime: number;
  totalTime: number;
};

export interface Track {
  artist: string;
  title: string;
  file: string;
  sampleRate: number;
  bitRate: number;
};