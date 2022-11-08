import styled from 'styled-components';
// Image

type Props = {
  image: string;
};

export const Wrapper = styled.div<Props>`
  input[type='range'] {
    -webkit-appearance: none;
    width: 400px;
    height: 10px;
    
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      background-image: ${props => `url('${props.image}')`};
      width: 28px;
      height: 10px;
    }
  }
`;
