import styled from 'styled-components';
// Image

type Props = {
  image: string;
  width: number;
  height: number;
};

export const Wrapper = styled.div<Props>`
  input[type='range'] {
    -webkit-appearance: none;
    width: ${props => `${props.width}px`};
    height: ${props => `${props.height}px`};

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      background-image: ${props => `url('${props.image}')`};
      width: 28px;
      height: 10px;
    }
  }
`;
