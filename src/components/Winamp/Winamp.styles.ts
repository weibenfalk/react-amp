import styled from 'styled-components';

type Props = {
  bgImage: string;
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
    left: 49px;
  }

  .volume-control {
    position: absolute;
    top: 57px;
    left: 107px;
  }

  .text-scroll {
    position: absolute;
    top: 25px;
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
  gap: 31px;
  top: 41px;
  left: 112px;
`;
