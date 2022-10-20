import React from 'react';

type ReturnType = {
  analyser?: AnalyserNode;
  bufferLength: number;
  dataArray?: Uint8Array;
};

export const useCreateAnalyser = (context?: AudioContext, source?: MediaElementAudioSourceNode): ReturnType => {
  const analyser = React.useRef<AnalyserNode>();
  const bufferLength = React.useRef(0);
  const dataArray = React.useRef<Uint8Array>();

  if (context && source) {
    analyser.current = context.createAnalyser();
    analyser.current.fftSize = 512;

    source.connect(analyser.current);
    // source.connect(context.destination);

    bufferLength.current = analyser.current.frequencyBinCount;
    dataArray.current = new Uint8Array(bufferLength.current);
    analyser.current.getByteTimeDomainData(dataArray.current);

    source?.connect(analyser.current);
  }

  return { analyser: analyser.current, bufferLength: bufferLength.current, dataArray: dataArray.current };
};
