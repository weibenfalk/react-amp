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

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);

  const { context, source, play, stop, pause } = useCreateAudio(audioRef);
  const analyser = useCreateAnalyser(context, source);

  const [currentTrack, setCurrentTrack] = React.useState(tracks[0]);
  const trackNr = tracks.findIndex(track => track.title === currentTrack.title);

  const handlePlay = () => {
    play();
    // If we're already playing a track, rewind to start of song when pressing play
    if (isPlaying && audioRef.current) audioRef.current.currentTime = 0;
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
    stop();
  };

  const handlePause = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
      setIsPaused(true);
      return;
    }

    play();
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handleTrackChange = (shouldChangeTrack: boolean, forward = true): void => {
    if (shouldChangeTrack) {
      const newTrack = forward ? tracks[trackNr + 1] : tracks[trackNr - 1];
      setCurrentTrack(newTrack);

      audioRef.current?.load();

      if (isPlaying || isPaused) {
        play();
        setIsPaused(false);
        setIsPlaying(true);
      }
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
          handlePlay={() => handlePlay()}
          handleStop={() => handleStop()}
          handlePause={() => handlePause()}
          handlePreviousTrack={() => handleTrackChange(trackNr > 0, false)}
          handleNextTrack={() => handleTrackChange(trackNr < tracks.length - 1)}
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
