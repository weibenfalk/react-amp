import React from 'react';
// Image
import VolumeImageMap from 'assets/VOLUME.BMP';
// Helpers
import { drawImageOnCanvas } from 'helpers';
// Styles
import { Wrapper } from './VolumeControl.styles';

const VOLUMEBAR_WIDTH = 68;
const VOLUMEBAR_HEIGHT = 14;
const HANDLE_WIDTH = 14;

type Props = {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
};

const VolumeControl = ({ volume, setVolume, className = "" }: Props) => {
  const [isDragging, setIsDragging] = React.useState(false);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const handleRef = React.useRef<HTMLCanvasElement>(null);

  const drawVolumeBar = (x: number, pressed = false) => {
    if (handleRef.current && canvasRef.current) {
      const rect = handleRef.current?.getBoundingClientRect();
      const handleLeftStartPos = rect?.left;

      let handlePos = x - handleLeftStartPos;

      // Cap handle to the right
      if (handlePos >= VOLUMEBAR_WIDTH - HANDLE_WIDTH) handlePos = VOLUMEBAR_WIDTH - HANDLE_WIDTH;
      // Cap handle to the left
      if (handlePos <= 0) handlePos = 0;

      const volumeFraction = handlePos / (VOLUMEBAR_WIDTH - HANDLE_WIDTH);
      setVolume(volumeFraction);

      // Draw Handle
      drawImageOnCanvas(VolumeImageMap, handleRef.current, {
        sourceX: pressed ? 0 : 15,
        sourceY: 422,
        sourceWidth: 14,
        sourceHeight: VOLUMEBAR_HEIGHT,
        destinationX: handlePos,
        destinationY: 0,
        destinationWidth: 14,
        destinationHeight: VOLUMEBAR_HEIGHT
      });

      // Draw volumebar
      drawImageOnCanvas(VolumeImageMap, canvasRef.current, {
        sourceX: 0,
        sourceY: 1 * Math.floor(volume / 0.0358) * (VOLUMEBAR_HEIGHT + 1), // +1 to compensate for the padding in the image map between images
        sourceWidth: VOLUMEBAR_WIDTH,
        sourceHeight: VOLUMEBAR_HEIGHT,
        destinationX: 0,
        destinationY: 0,
        destinationWidth: VOLUMEBAR_WIDTH,
        destinationHeight: VOLUMEBAR_HEIGHT
      });
    }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    drawVolumeBar(event.clientX - HANDLE_WIDTH / 2, true);
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    setIsDragging(false);
    drawVolumeBar(event.clientX - HANDLE_WIDTH / 2, false);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging) {
      const mouseXPos = event.clientX - HANDLE_WIDTH / 2;
      drawVolumeBar(mouseXPos, true);
    }
  };

  const handleMouseOut = (event: React.MouseEvent) => setIsDragging(false);

  // Show the volumebar on mount
  React.useEffect(() => {
    const volumePos = Math.round(volume * (VOLUMEBAR_WIDTH - HANDLE_WIDTH));

    const rect = handleRef.current?.getBoundingClientRect();
    const handleLeftStartPos = rect?.left;

    if (handleLeftStartPos) drawVolumeBar(handleLeftStartPos + volumePos);
  }, []);

  return (
    <Wrapper className={className}>
      <canvas
        className='handle'
        ref={handleRef}
        width={68}
        height={14}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
      />
      <canvas ref={canvasRef} width={68} height={14} />
    </Wrapper>
  );
};

export default VolumeControl;
