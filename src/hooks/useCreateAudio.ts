import React from 'react';

export const useCreateAudio = (audioRef: React.RefObject<HTMLMediaElement>) => {
  const context = React.useRef<AudioContext>();
  const source = React.useRef<MediaElementAudioSourceNode>();

  const play = () => {
    if (!context.current && audioRef.current) {
      context.current = new AudioContext();
      source.current = context.current.createMediaElementSource(audioRef.current);
      source.current.connect(context.current.destination);
    }

    if (audioRef.current) audioRef.current.play();
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const pause = () => {
    if (audioRef.current) audioRef.current.pause();
  };

  return { play, stop, pause, context: context.current, source: source.current };
};
