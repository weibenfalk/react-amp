import React from 'react';
// Styles
import { Wrapper } from './TextDisplay.styles';

type Props = {
  text: string;
  isScrolling?: boolean;
};

const TextDisplay = ({ text, isScrolling = false }: Props) => {
 
  return (
    <Wrapper>
      <div className='container'>
        <p>{text}</p>
        <p>{text}</p>
        <p>{text}</p>
      </div>
      <div className='container'>
        <p>{text}</p>
        <p>{text}</p>
        <p>{text}</p>
      </div>
    </Wrapper>
  );
};

export default TextDisplay;
