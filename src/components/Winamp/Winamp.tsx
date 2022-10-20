import React from 'react';
// Components
import SpectrumAnalyser from '../SpectrumAnalyser/SpectrumAnalyser';
import ButtonGroup from 'components/ButtonGroup/ButtonGroup';
// Hooks
import { useCreateAudio } from 'hooks/useCreateAudio';
import { useCreateAnalyser } from 'hooks/useCreateAnalyser';
// Tracks
import { tracks } from 'tracks';
// Background Image
import BGImage from 'assets/main.png';
// Styles
import { Wrapper, SpectrumAnalyserWrapper, ButtonGroupWrapper } from './Winamp.styles';

const Winamp = () => {
  const audioRef = React.useRef<HTMLMediaElement>(null);

  const { context, source, play, stop } = useCreateAudio(audioRef);
  const analyser = useCreateAnalyser(context, source);

  const [currentTrack, setCurrentTrack] = React.useState(tracks[0]);
  const trackNr = tracks.findIndex(track => track.title === currentTrack.title);

  const handlePreviousTrack = () => {
    // If we haven't reached the start of the tracklist, do nothing
    if (trackNr <= 0) return;
    // Change track
    setCurrentTrack(tracks[trackNr - 1]);
    audioRef.current?.load();

    if (context?.state === 'running') {
      audioRef.current?.play();
    }
  };

  const handleNextTrack = () => {
    // If we've reached the end of the tracklist, do nothing
    if (trackNr >= tracks.length - 1) return;
    // Change track
    setCurrentTrack(tracks[trackNr + 1]);
    audioRef.current?.load();

    if (context?.state === 'running') {
      audioRef.current?.play();
    }
  };

  return (
    <Wrapper bgImage={BGImage}>
      <audio ref={audioRef}>
        <source src={currentTrack.file} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <ButtonGroupWrapper>
        <ButtonGroup
          handlePlay={play}
          handleStop={stop}
          handlePause={stop} // TODO: Fix this!
          handlePreviousTrack={handlePreviousTrack}
          handleNextTrack={handleNextTrack}
        />
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
    </Wrapper>
  );
};

export default Winamp;
