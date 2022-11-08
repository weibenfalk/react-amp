import styled from 'styled-components';

type Props = {
  isPaused: boolean;
};

export const Wrapper = styled.div<Props>`
  position: relative;
  background-size: cover;
  width: 275px;
  height: 116px;

  .title-bar {
    position: absolute;
    top: 0;
    left: 0;
  }

  .play-pause-button {
    position: absolute;
    top: 28px;
    left: 25px;
  }

  .display-buttons {
    position: absolute;
    top: 22px;
    left: 11px;
  }

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

  .shuf-rep-buttons {
    position: absolute;
    top: 89px;
    left: 167px;
  }
`;

export const FrequenciesWrapper = styled.div`
  position: absolute;
  display: flex;
  gap: 30.5px;
  top: 43px;
  left: 111px;
`;
