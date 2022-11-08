import styled from 'styled-components';

type Props = {
  isPaused: boolean;
};

export const Wrapper = styled.div<Props>`
  position: relative;
  background-size: cover;
  width: 275px;
  height: 116px;

  .mono-stereo {
    position: absolute;
    top: 39px;
    right: 7px;
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
    top: 55px;
    left: 105px;
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

  .shuf-rep-buttons {
    position: absolute;
    display: flex;
    top: 89px;
    left: 164px;
  }
`;

export const FrequenciesWrapper = styled.div`
  position: absolute;
  display: flex;
  gap: 30.5px;
  top: 43px;
  left: 111px;
`;
