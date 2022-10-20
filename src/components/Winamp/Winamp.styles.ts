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
`;

export const SpectrumAnalyserWrapper = styled.div`
  position: absolute;
  top: 45px;
  left: 24px;
`;

export const ButtonGroupWrapper = styled.div`
  position: absolute;
  top: 88px;
  left: 16px;
`;

export const TextDisplayWrapper = styled.div`
  position: absolute;
  top: 25px;
  left: 112px;
`;

export const FrequenciesWrapper = styled.div`
  position: absolute;
  display: flex;
  gap: 31px;
  top: 41px;
  left: 112px;
`;
