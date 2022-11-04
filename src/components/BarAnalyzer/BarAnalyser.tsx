import React from 'react';
// Hooks
import { useRequestAnimationFrame } from 'hooks/useRequestAnimationFrame';

type Props = {
  isPlaying: boolean;
  analyser?: AnalyserNode;
  dataArray?: Uint8Array;
  bufferLength: number;
  className?: string;
};

const BarAnalyzer = ({ isPlaying, analyser, dataArray, bufferLength, className = '' }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const draw = () => {
    //@ts-ignore
    const canvasCtx = canvasRef.current.getContext('2d');
    const canvas = canvasRef.current;

    if (!canvasRef.current || !analyser || !dataArray || !canvas || !canvasCtx) return;

    const fbc_array = new Uint8Array(analyser.frequencyBinCount);
    const bar_count = 19;

    let bar_pos;
    let bar_width;
    let bar_height;

    analyser.getByteFrequencyData(fbc_array);

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.fillStyle = '#ffffff';

    for (var i = 0; i < bar_count; i++) {
      bar_pos = i * 4;
      bar_width = 3;
      bar_height = -(fbc_array[i] / 15);

      canvasCtx.fillRect(bar_pos, canvas.height, bar_width, bar_height);
    }
  };

  useRequestAnimationFrame(isPlaying, draw);

  if (!analyser || !dataArray) return null;

  return <canvas className={className} width={77} height={14} ref={canvasRef} />;
};

export default BarAnalyzer;
