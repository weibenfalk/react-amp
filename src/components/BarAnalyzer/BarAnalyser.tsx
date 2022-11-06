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

  const barCount = 19;
  const capDropRate = 0.05;
  const barWidth = 3;
  const capHeight = 1;

  const capArray: Array<number> = new Array(barCount).fill(0);

  const draw = () => {
    //@ts-ignore
    const canvasCtx = canvasRef.current.getContext('2d');
    const canvas = canvasRef.current;

    if (!canvasRef.current || !analyser || !dataArray || !canvas || !canvasCtx) return;

    // As the array with data has far more elements than the number of bars,
    // we want to step through the dataArray and grab as many elements as the bars along the spectrum.
    const step = Math.round(dataArray.length / barCount);

    let barPos;
    let barHeight;

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

    for (var i = 0; i < barCount; i++) {
      barPos = i * 4;
      // Adjust the bar height
      barHeight = Math.round(dataArray[i * step] / canvas.height);

      // First draw the bar
      canvasCtx.fillStyle = gradient;
      canvasCtx.fillRect(barPos, canvas.height, barWidth, -barHeight + capHeight);

      // Then draw the cap
      canvasCtx.fillStyle = 'rgb(150, 150, 150)';

      if (barHeight < capArray[i]) {
        capArray[i] = capArray[i] - capDropRate;
        canvasCtx.fillRect(barPos, canvas.height - capArray[i], barWidth, capHeight);
      } else {
        canvasCtx.fillRect(barPos, canvas.height - barHeight, barWidth, capHeight);
        capArray[i] = barHeight;
      }
    }
  };

  useRequestAnimationFrame(isPlaying, draw);

  if (!analyser || !dataArray) return null;

  return <canvas className={className} width={77} height={14} ref={canvasRef} />;
};

export default BarAnalyzer;
