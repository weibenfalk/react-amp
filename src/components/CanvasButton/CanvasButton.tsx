import React from 'react';
// Image map
import ButtonsImageMap from 'assets/CBUTTONS.BMP';
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

const BUTTON_WIDTH = 23;
const BUTTON_HEIGHT = 18;

const drawButtonOnCanvas = (canvas: HTMLCanvasElement, position = 0, isClicked = false) => {
  const context = canvas.getContext('2d');

  const image = document.createElement('img');
  image.src = ButtonsImageMap;

  image.onload = () => {
    context?.clearRect(0, 0, BUTTON_WIDTH, BUTTON_HEIGHT);
    context?.drawImage(
      image,
      BUTTON_WIDTH * position,
      isClicked ? BUTTON_HEIGHT : 0,
      BUTTON_WIDTH,
      BUTTON_HEIGHT,
      0,
      0,
      BUTTON_WIDTH,
      BUTTON_HEIGHT
    );
  };
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
  });

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
