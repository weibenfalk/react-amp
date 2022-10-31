import styled from 'styled-components';

export const Wrapper = styled.div`
  .volume-slider {
    position: absolute;
    top: 1px;
    left: 0;
    width: 63px;
    appearance: none;
    background: transparent;
  }

  .volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 8px;
    background: #04aa6d;
    cursor: pointer;
  }
`;
