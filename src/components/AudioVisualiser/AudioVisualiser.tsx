import React from 'react';
// Hooks
import { useRequestAnimationFrame } from 'hooks/useRequestAnimationFrame';
// Visualisertypes
import { renderBars, renderOscilloscope } from './visualiserTypes';

export enum VisualiserType {
  'OSC' = 'oscilloscope',
  'BAR' = 'bar'
}

type Props = {
  isPlaying: boolean;
  type: VisualiserType;
  analyser: React.MutableRefObject<AnalyserNode | undefined>;
  dataArray: React.MutableRefObject<Uint8Array | undefined>;
  bufferLength: React.MutableRefObject<number>;
  className?: string;
};

const CANVAS_WIDTH = 77;
const CANVAS_HEIGHT = 14;

const AudioVisualiser = ({ isPlaying, analyser, dataArray, bufferLength, type, className = '' }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Memoize with a callback so that the useRequestAnimationFrame hook don't run unnessecarily
  const barsOrOsc = (type: VisualiserType) => {
    if (canvasRef.current && analyser.current && dataArray.current) {
      const canvasCtx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;

      analyser.current.getByteFrequencyData(dataArray.current);

      if (type === VisualiserType.BAR) {
        renderBars(canvasRef.current, canvasCtx, dataArray.current);
      } else {
        analyser.current.getByteTimeDomainData(dataArray.current);
        renderOscilloscope(canvasRef.current, canvasCtx, dataArray.current, bufferLength.current);
      }
    }
  };

  useRequestAnimationFrame(
    isPlaying,
    React.useCallback(() => barsOrOsc(type), [type])
  );

  return <canvas className={className} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={canvasRef} />;
};

export default AudioVisualiser;
