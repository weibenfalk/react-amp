import React from 'react';
// Image map
import ButtonsImageMap from 'assets/CBUTTONS.BMP';
// Helpers
import { drawImageOnCanvas } from 'helpers';
// Styles
import { Wrapper } from './CanvasButton.styles';

export enum ButtonType {
  previous,
  play,
  pause,
  stop,
  next
}

type Props = {
  type: ButtonType;
  clickHandler?: () => void;
};

const BUTTON_WIDTH = 22;
const BUTTON_HEIGHT = 18;
const PADDING = 1;

const drawButtonOnCanvas = (canvas: HTMLCanvasElement, position = 0, isClicked = false) => {
  drawImageOnCanvas(ButtonsImageMap, canvas, {
    sourceX: BUTTON_WIDTH * position + (position * PADDING), // Need to add position to compensate for the padding in the image
    sourceY: isClicked ? BUTTON_HEIGHT + PADDING : 0,
    sourceWidth: BUTTON_WIDTH,
    sourceHeight: BUTTON_HEIGHT,
    destinationX: 0,
    destinationY: 0,
    destinationWidth: BUTTON_WIDTH,
    destinationHeight: BUTTON_HEIGHT
  });
};

const CanvasButton = ({ type, clickHandler }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const handleMouseDown = () => {
    if (clickHandler) clickHandler();
    if (canvasRef.current) drawButtonOnCanvas(canvasRef.current, type, true);
  };
  const handleMouseUp = () => {
    if (canvasRef.current) drawButtonOnCanvas(canvasRef.current, type, false);
  };

  React.useEffect(() => {
    if (canvasRef.current) drawButtonOnCanvas(canvasRef.current, type);
  }, []);

  return (
    <Wrapper>
      <canvas
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        ref={canvasRef}
        width={BUTTON_WIDTH}
        height={BUTTON_HEIGHT}
      />
    </Wrapper>
  );
};

export default CanvasButton;
