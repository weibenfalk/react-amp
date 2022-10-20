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

    audioRef.current?.play();
  };

  const stop = () => {
    audioRef.current?.pause();
  };

  // const pause = () => {
  //   if (!context || !source.current) return;

  //   if (source.current.playbackRate.value === 0) {
  //     source.current.playbackRate.value = 1;
  //   } else {
  //     source.current.playbackRate.value = 0;
  //   }
  // };

  return { play, stop, context: context.current, source: source.current };
};
