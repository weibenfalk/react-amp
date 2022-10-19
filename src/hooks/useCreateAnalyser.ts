import React from 'react';

type ReturnType = {
  analyser?: AnalyserNode;
  bufferLength: number;
  dataArray?: Uint8Array;
};

export const useCreateAnalyser = (context?: AudioContext, source?: AudioBufferSourceNode): ReturnType | void => {
  const analyser = React.useRef<AnalyserNode>();
  const bufferLength = React.useRef(0);
  const dataArray = React.useRef<Uint8Array>();

  if (context && source) {
    analyser.current = context.createAnalyser();
    analyser.current.fftSize = 512;

    bufferLength.current = analyser.current.frequencyBinCount;
    dataArray.current = new Uint8Array(bufferLength.current);
    analyser.current.getByteTimeDomainData(dataArray.current);

    source?.connect(analyser.current);
    // analyser.connect(context!.destination);
  }

  return { analyser: analyser.current, bufferLength: bufferLength.current, dataArray: dataArray.current };
};
