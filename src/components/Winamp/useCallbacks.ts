// Context
import { useStateContext } from 'context';

export const useCallbacks = (audioRef: any, tracks: any, trackNr: any, play: any, pause: any, stop: any) => {
  const { setCurrentTrack, flags, setFlags, metrics, setMetrics } = useStateContext();

  const handlePlay = () => {
    play();
    // If we're already playing a track, rewind to start of song when pressing play
    if (flags.isPlaying && audioRef.current) audioRef.current.currentTime = 0;
    setFlags(prev => ({ ...prev, isPlaying: true, isPaused: false }));
  };

  const handleStop = () => {
    setFlags(prev => ({ ...prev, isPlaying: false, isPaused: false }));
    stop();
  };

  const handlePause = () => {
    if (flags.isPlaying) {
      pause();
      setFlags(prev => ({ ...prev, isPlaying: false, isPaused: true }));
      return;
    }

    play();
    setFlags(prev => ({ ...prev, isPlaying: true, isPaused: false }));
  };

  const handleTrackChange = (shouldChangeTrack: boolean, forward = true): void => {
    if (flags.isShuffle) {
      const randomTrackNr = Math.floor(Math.random() * tracks.length);
      const newTrack = tracks[randomTrackNr];

      setCurrentTrack(newTrack);
    } else if (shouldChangeTrack) {
      const newTrack = forward ? tracks[trackNr + 1] : tracks[trackNr - 1];
      setCurrentTrack(newTrack);
    }

    audioRef.current?.load();

    if (flags.isPlaying || flags.isPaused) {
      play();
      setFlags(prev => ({ ...prev, isPlaying: true, isPaused: false }));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const roundedTime = Math.floor(audioRef.current.currentTime);
      const roundedTotalTime = Math.floor(audioRef.current.duration);

      setMetrics(prev => ({ ...prev, playtime: roundedTime, totalTime: roundedTotalTime }));

      if (!flags.isDragging) setMetrics(prev => ({ ...prev, scrubtime: roundedTime }));
    }
  };

  const handleOnEnd = () => {
    if (audioRef.current && flags.isRepeat) {
      audioRef.current.currentTime = 0;
      play();
      return;
    }

    handleTrackChange(trackNr < tracks.length - 1);
  };

  const handleScrubRelease = (value: number) => {
    const _playTime = (value / 100) * metrics.totalTime;
    if (audioRef.current) audioRef.current.currentTime = _playTime;
  };

  const handleVisualisationChange = () => setFlags(prev => ({ ...prev, isBars: !prev.isBars }));

  return {
    handlePlay,
    handleStop,
    handlePause,
    handleTrackChange,
    handleTimeUpdate,
    handleOnEnd,
    handleScrubRelease,
    handleVisualisationChange
  };
};
