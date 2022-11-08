import React from 'react';
// Image map
import { controlButtonsImageMap } from 'imageImports';
// Helpers
import { drawImageOnCanvas } from 'helpers';
// Styles
import { Wrapper } from './ControlButton.styles';

export enum ControlButtonType {
  previous,
  play,
  pause,
  stop,
  next,
  eject
}

type Props = {
  type: ControlButtonType;
  clickHandler?: () => void;
  className?: string;
};

const BUTTON_WIDTH = 22;
const BUTTON_HEIGHT = 17;
const EJECT_BUTTON_HEIGHT = 15;
const PADDING = 1;

const drawButtonOnCanvas = (canvas: HTMLCanvasElement, position = 0, isClicked = false) => {
  const padding = position === 5 ? position - 1 * PADDING : position * PADDING;
  const sourceX = BUTTON_WIDTH * position + padding;
  const buttonHeight = position === 5 ? EJECT_BUTTON_HEIGHT : BUTTON_HEIGHT;

  drawImageOnCanvas(controlButtonsImageMap, canvas, {
    sourceX, // Need to add position to compensate for the padding in the image
    sourceY: isClicked ? buttonHeight + PADDING : 0,
    sourceWidth: BUTTON_WIDTH,
    sourceHeight: buttonHeight,
    destinationX: 0,
    destinationY: 0,
    destinationWidth: BUTTON_WIDTH,
    destinationHeight: buttonHeight
  });
};

const ControlButton = ({ type, clickHandler, className = '' }: Props) => {
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
  }, [type]);

  return (
    <Wrapper className={className}>
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

export default ControlButton;
