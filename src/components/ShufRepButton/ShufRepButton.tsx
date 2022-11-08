import React from 'react';
// Image
import { shufRepImageMap } from 'imageImports';
// Helpers
import { drawImageOnCanvas } from 'helpers';
// Styles
import { Wrapper } from './ShufRepButton.styles';

export enum ShufRepButtonType {
  repeat,
  shuffle
}

type Props = {
  type: ShufRepButtonType;
  active: boolean;
  clickHandler?: () => void;
  className?: string;
};

const REPEAT_BUTTON_WIDTH = 28;
const SHUFFLE_BUTTON_WIDTH = 47;
const BUTTON_HEIGHT = 15;
const PADDING = 1;

const drawButtonOnCanvas = (canvas: HTMLCanvasElement, position = 0, isClicked = false, isActive = false) => {
  const buttonWidth = position === 0 ? REPEAT_BUTTON_WIDTH : SHUFFLE_BUTTON_WIDTH;
  const sourceX = position === 0 ? 0 : REPEAT_BUTTON_WIDTH;

  const startSourceY = isActive ? BUTTON_HEIGHT * 2 : 0;

  drawImageOnCanvas(shufRepImageMap, canvas, {
    sourceX,
    sourceY: startSourceY + (isClicked ? BUTTON_HEIGHT : 0),
    sourceWidth: buttonWidth,
    sourceHeight: BUTTON_HEIGHT,
    destinationX: 0,
    destinationY: 0,
    destinationWidth: buttonWidth,
    destinationHeight: BUTTON_HEIGHT
  });
};

const ShufRepButton = ({ type, active, clickHandler, className = '' }: Props) => {
  const [isClicked, setIsClicked] = React.useState(false);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const handleMouseDown = () => setIsClicked(true);

  const handleMouseUp = () => {
    setIsClicked(false);
    if (clickHandler) clickHandler();
  };

  React.useEffect(() => {
    if (canvasRef.current) drawButtonOnCanvas(canvasRef.current, type, isClicked, active);
  }, [type, active, isClicked]);

  return (
    <Wrapper className={className}>
      <canvas
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsClicked(false)}
        ref={canvasRef}
        width={type === ShufRepButtonType.repeat ? REPEAT_BUTTON_WIDTH : SHUFFLE_BUTTON_WIDTH}
        height={BUTTON_HEIGHT}
      />
    </Wrapper>
  );
};

export default ShufRepButton;
