import React from 'react';
// Styles
import { Wrapper } from './Button.styles';

export type ButtonType = 'play' | 'stop' | 'pause' | 'previous' | 'next';

type Props = {
  type: ButtonType;
  clickHandler?: () => void;
};

const Button = ({ type, clickHandler }: Props) => {
  const [isClicked, setIsClicked] = React.useState(false);

  const currentImageUrl = `/assets/${type}${isClicked ? '-clicked' : ''}.png`;

  const handleMouseDown = () => {
    if (clickHandler) clickHandler();
    setIsClicked(true);
  };
  const handleMouseUp = () => setIsClicked(false);

  return (
    <Wrapper>
      <img
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        src={currentImageUrl}
        alt={`${type}-button`}
        draggable={false}
      />
    </Wrapper>
  );
};

export default Button;
