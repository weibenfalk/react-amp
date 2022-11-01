import React from 'react';
// Image
import VolumeImageMap from 'assets/VOLUME.BMP';
// Helpers
import { drawImageOnCanvas } from './helpers';
// Styles
import { Wrapper } from './VolumeControl.styles';

const VOLUMEBAR_WIDTH = 68;
const VOLUMEBAR_HEIGTH = 14;
const HANDLE_WIDTH = 14;

type Props = {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
};

const VolumeControl = ({ volume, setVolume }: Props) => {
  const [isDragging, setIsDragging] = React.useState(false);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const handleRef = React.useRef<HTMLCanvasElement>(null);

  const rect = handleRef.current?.getBoundingClientRect();
  const handleLeftStartPos = rect?.left;

  React.useEffect(() => {
    if (canvasRef.current) {
      drawImageOnCanvas(VolumeImageMap, canvasRef.current, {
        sourceX: 0,
        sourceY: 1 * Math.floor(volume / 0.0358) * (VOLUMEBAR_HEIGTH + 1), // +1 to compensate for the padding in the image map between images
        sourceWidth: VOLUMEBAR_WIDTH,
        sourceHeigth: VOLUMEBAR_HEIGTH,
        destinationX: 0,
        destinationY: 0,
        destinationWidth: VOLUMEBAR_WIDTH,
        destinationHeight: VOLUMEBAR_HEIGTH
      });
    }
  }, [volume]);

  const drawHandle = (x: number, pressed = false) => {
    if (handleRef.current && handleLeftStartPos) {
      drawImageOnCanvas(VolumeImageMap, handleRef.current, {
        sourceX: pressed ? 0 : 15,
        sourceY: 422, // +1 to compensate for the padding in the image map between images
        sourceWidth: 14,
        sourceHeigth: VOLUMEBAR_HEIGTH,
        destinationX: x - handleLeftStartPos,
        destinationY: 0,
        destinationWidth: 14,
        destinationHeight: VOLUMEBAR_HEIGTH
      });
    }
  };

  React.useEffect(() => {
    drawHandle(200);
  }, []);

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    drawHandle(event.clientX - HANDLE_WIDTH / 2, true);
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    setIsDragging(false);
    drawHandle(event.clientX - HANDLE_WIDTH / 2, false);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging && handleRef.current) {
      const rect = handleRef.current.getBoundingClientRect();
      const handleLeftStartPos = rect.left;
      const maxXRight = handleLeftStartPos + VOLUMEBAR_WIDTH;
      const mouseXPos = event.clientX - HANDLE_WIDTH / 2;

      // Restrain the handle to not go outside the width of the canvas
      if (mouseXPos - handleLeftStartPos < 0 || mouseXPos > maxXRight - 14) return;

      drawHandle(mouseXPos, true);

      const volumeFraction = (mouseXPos - handleLeftStartPos) / 54;
      setVolume(volumeFraction);
    }
  };

  const handleMouseOut = (event: React.MouseEvent) => {
    setIsDragging(false);
  };

  return (
    <Wrapper>
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
