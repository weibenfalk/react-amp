import React from 'react';
// Components
import SpectrumAnalyser from '../SpectrumAnalyser/SpectrumAnalyser';
import ButtonGroup from 'components/ButtonGroup/ButtonGroup';
// Hooks
import { useCreateAudio } from 'hooks/useCreateAudio';
import { useCreateAnalyser } from 'hooks/useCreateAnalyser';
// Background Image
import BGImage from 'assets/main.png';
// Styles
import { Wrapper, SpectrumAnalyserWrapper, ButtonGroupWrapper } from './Winamp.styles';

const Winamp = () => {
  const [currentTrack, setCurrentTrack] = React.useState('overbord-test-2022.mp3');
  const { context, source, play, stop, pause } = useCreateAudio();
  const analyser = useCreateAnalyser(context, source);

  console.log(context);

  const playTrack = () => play(currentTrack);
  const stopTrack = () => stop();

  return (
    <Wrapper bgImage={BGImage}>
      <ButtonGroupWrapper>
        <ButtonGroup />
      </ButtonGroupWrapper>
      {analyser ? (
        <SpectrumAnalyserWrapper>
          <SpectrumAnalyser
            analyser={analyser.analyser}
            dataArray={analyser.dataArray}
            bufferLength={analyser.bufferLength}
          />
        </SpectrumAnalyserWrapper>
      ) : null}
      <button onClick={playTrack}>Play music</button>
      <button onClick={stopTrack}>Stop music</button>
      <button onClick={() => pause()}>Pause music</button>
    </Wrapper>
  );
};

export default Winamp;
