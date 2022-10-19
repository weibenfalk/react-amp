import React from 'react';

export const useCreateAudio = () => {
  const context = React.useRef<AudioContext | undefined>(undefined);
  const source = React.useRef<AudioBufferSourceNode | undefined>(undefined);

  const createAudio = async (audioFile: string): Promise<void> => {
    context.current = new AudioContext();
    source.current = context.current.createBufferSource();

    const response = await fetch(audioFile);
    const arrayBuffer = await response.arrayBuffer();

    const audioBuffer = await context.current.decodeAudioData(arrayBuffer);

    source.current.buffer = audioBuffer;
  };

  const play = (currentAudio: string) => {
    if (context.current && source.current) {
      // Stop currently playing song, if playing one
      source.current.stop();
    }
    // Fetch and prepare selected audio
    createAudio(currentAudio);

    source.current!.connect(context.current!.destination);
    source.current!.start(0);
  };

  const stop = () => {
    if (!context.current || context.current.state === 'suspended' || !source.current) return;

    source.current.stop(0);
  };

  const pause = () => {
    if (!context.current || !source.current) return;

    if (source.current.playbackRate.value === 0) {
      source.current.playbackRate.value = 1;
    } else {
      source.current.playbackRate.value = 0;
    }
  };

  return { play, stop, pause, context: context.current, source: source.current };
};
