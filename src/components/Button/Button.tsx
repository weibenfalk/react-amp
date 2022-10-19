import React from 'react';
// Styles
import { Wrapper } from './Button.styles';

export type ButtonType = 'play' | 'stop' | 'pause' | 'previous' | 'next';

type Props = {
  type: ButtonType;
};

const Button = ({ type }: Props) => {
  const [isClicked, setIsClicked] = React.useState(false);

  const currentImageUrl = `/assets/${type}${isClicked ? '-clicked' : ''}.png`;

  const handleMouseDown = () => setIsClicked(true);
  const handleMouseUp = () => setIsClicked(false);

  return (
    <Wrapper>
      <img onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} src={currentImageUrl} alt={`${type}-button`} />
      Button
    </Wrapper>
  );
};

export default Button;
