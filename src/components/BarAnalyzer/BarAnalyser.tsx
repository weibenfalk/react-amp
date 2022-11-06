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

    const bar_count = 19;
    const step = Math.round(dataArray.length / bar_count);

    let bar_pos;
    let bar_width;
    let bar_height;

    analyser.getByteFrequencyData(dataArray);

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = canvasCtx.createLinearGradient(0, 0, 0, 15);
    gradient.addColorStop(1 / 16, 'rgb(239,49,16)');
    gradient.addColorStop(2 / 16, 'rgb(206,41,16)');
    gradient.addColorStop(3 / 16, 'rgb(214,90,0)');
    gradient.addColorStop(4 / 16, 'rgb(214,102,0)');
    gradient.addColorStop(5 / 16, 'rgb(214,115,0)');
    gradient.addColorStop(6 / 16, 'rgb(198,123,8)');
    gradient.addColorStop(7 / 16, 'rgb(222,165,24)');
    gradient.addColorStop(8 / 16, 'rgb(214,181,33)');
    gradient.addColorStop(9 / 16, 'rgb(189,222,41)');
    gradient.addColorStop(10 / 16, 'rgb(148,222,33)');
    gradient.addColorStop(11 / 16, 'rgb(41,206,16)');
    gradient.addColorStop(12 / 16, 'rgb(50,190,16)');
    gradient.addColorStop(13 / 16, 'rgb(57,181,16)');
    gradient.addColorStop(14 / 16, 'rgb(49,156,8)');
    gradient.addColorStop(15 / 16, 'rgb(41,148,0)');
    gradient.addColorStop(16 / 16, 'rgb(24,132,8)');

    console.log(dataArray);

    canvasCtx.fillStyle = gradient;

    for (var i = 0; i < bar_count; i++) {
      bar_pos = i * 4;
      bar_width = 3;
      // Adjust the bars to not be that hight
      bar_height = -(dataArray[i * step] / 14);

      canvasCtx.fillRect(bar_pos, canvas.height, bar_width, bar_height);
    }
  };

  useRequestAnimationFrame(isPlaying, draw);

  if (!analyser || !dataArray) return null;

  return <canvas className={className} width={77} height={14} ref={canvasRef} />;
};

export default BarAnalyzer;
