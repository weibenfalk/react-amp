import React from 'react';

type Props = {
  analyser?: AnalyserNode;
  dataArray?: Uint8Array;
  bufferLength: number;
  className?: string;
};

const SpectrumAnalyser = ({ analyser, dataArray, bufferLength, className = '' }: Props) => {
  const canvasRef = React.useRef(null);

  const draw = () => {
    requestAnimationFrame(draw);
    if (!canvasRef.current || !analyser || !dataArray) return;

    //@ts-ignore
    const canvasCtx = canvasRef.current.getContext('2d');
    const canvas = canvasRef.current as JSX.IntrinsicElements['canvas'];

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 1;
    canvasCtx.strokeStyle = '#fff';

    canvasCtx.beginPath();

    //@ts-ignore
    const sliceWidth = (canvas.width * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      //@ts-ignore
      const y = (v * canvas.height) / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    //@ts-ignore
    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  };

  React.useEffect(() => {
    draw();
  }, [analyser, dataArray, bufferLength]);

  if (!analyser || !dataArray) return null;

  return <canvas className={className} width={77} height={14} ref={canvasRef} />;
};

export default SpectrumAnalyser;
