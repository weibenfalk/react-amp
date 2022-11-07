import styled from 'styled-components';

type Props = {
  bgImage: string;
  isPaused: boolean;
};

export const Wrapper = styled.div<Props>`
  position: relative;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  width: 275px;
  height: 116px;

  .mono-stereo {
    position: absolute;
    top: 39px;
    right: 8px;
  }

  .time-display {
    position: absolute;
    top: 26px;
    left: 37px;
    animation: ${props => (props.isPaused ? 'blink-animation 2s steps(2, start) infinite' : 'none')};

    @keyframes blink-animation {
      to {
        visibility: hidden;
      }
    }
    @-webkit-keyframes blink-animation {
      to {
        visibility: hidden;
      }
    }
  }

  .volume-control {
    position: absolute;
    top: 57px;
    left: 107px;
  }

  .text-scroll {
    position: absolute;
    top: 27px;
    left: 112px;
  }

  .button-group {
    position: absolute;
    top: 88px;
    left: 16px;
  }

  .spectrum-analyser {
    position: absolute;
    top: 45px;
    left: 24px;
  }
`;

export const FrequenciesWrapper = styled.div`
  position: absolute;
  display: flex;
  gap: 30.5px;
  top: 43px;
  left: 111px;
`;
