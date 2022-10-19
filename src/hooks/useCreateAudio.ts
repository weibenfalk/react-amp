import React from 'react';

export const useCreateAudio = () => {
  const [context, setContext] = React.useState<AudioContext>();

  const source = React.useRef<AudioBufferSourceNode | undefined>(undefined);

  const play = async (currentAudio: string) => {
    if (context && source.current) {
      console.log('STOPPING!');
      // Stop currently playing song, if playing one
      source.current.stop();
    }
    // Fetch and prepare selected audio
    const tempContext = new AudioContext();
    const tempSource = tempContext.createBufferSource();

    const response = await fetch(currentAudio);
    const arrayBuffer = await response.arrayBuffer();

    const audioBuffer = await tempContext.decodeAudioData(arrayBuffer);

    tempSource.buffer = audioBuffer;
    tempSource.connect(tempContext.destination);

    source.current = tempSource;

    setContext(tempContext);

    source.current!.start(0);
  };

  const stop = () => {
    if (!context || context.state === 'suspended' || !source.current) return;

    source.current.stop(0);
  };

  const pause = () => {
    if (!context || !source.current) return;

    if (source.current.playbackRate.value === 0) {
      source.current.playbackRate.value = 1;
    } else {
      source.current.playbackRate.value = 0;
    }
  };

  return { play, stop, pause, context: context, source: source.current };
};
