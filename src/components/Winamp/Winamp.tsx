import React from 'react';
// Components
import BarAnalyzer from 'components/BarAnalyzer/BarAnalyser';
import SpectrumAnalyser from '../SpectrumAnalyser/SpectrumAnalyser';
import ButtonGroup from 'components/ButtonGroup/ButtonGroup';
import TextScroll from 'components/TextScroll/TextScroll';
import Text from 'components/Text/Text';
import MonoStereo from 'components/MonoStereo/MonoStereo';
import TimeDisplay from 'components/TimeDisplay/TimeDisplay';
import VolumeControl from 'components/VolumeControl/VolumeControl';
// Hooks
import { useCreateAudio } from 'hooks/useCreateAudio';
import { useCreateAnalyser } from 'hooks/useCreateAnalyser';
// Tracks
import { tracks } from 'tracks';
// Background Image
import BGImage from 'assets/main.png';
// Styles
import { Wrapper, FrequenciesWrapper } from './Winamp.styles';

const Winamp = () => {
  const audioRef = React.useRef<HTMLMediaElement>(null);

  const [currentTrack, setCurrentTrack] = React.useState(tracks[0]);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [volume, setVolume] = React.useState(1);

  const [playTime, setPlayTime] = React.useState(0);
  const [totalTime, setTotalTime] = React.useState(0);

  const { context, source, play, stop, pause } = useCreateAudio(audioRef);
  const analyser = useCreateAnalyser(context, source);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const trackNr = tracks.findIndex(track => track.title === currentTrack.title);

  const handlePlay = () => {
    play();
    // If we're already playing a track, rewind to start of song when pressing play
    if (isPlaying && audioRef.current) audioRef.current.currentTime = 0;
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setIsPaused(false);
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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const roundedTime = Math.floor(audioRef.current.currentTime);
      const roundedTotalTime = Math.floor(audioRef.current.duration);

      setPlayTime(roundedTime);
      setTotalTime(roundedTotalTime);
    }
  };

  return (
    <Wrapper bgImage={BGImage} isPaused={isPaused}>
      <audio
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => handleTrackChange(trackNr < tracks.length - 1)}
        ref={audioRef}
      >
        <source src={currentTrack.file} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <ButtonGroup
        className='button-group'
        handlePlay={() => handlePlay()}
        handleStop={() => handleStop()}
        handlePause={() => handlePause()}
        handlePreviousTrack={() => handleTrackChange(trackNr > 0, false)}
        handleNextTrack={() => handleTrackChange(trackNr < tracks.length - 1)}
      />
      {analyser ? (
        <>
          <BarAnalyzer
            className='spectrum-analyser'
            isPlaying={isPlaying}
            analyser={analyser.analyser}
            dataArray={analyser.dataArray}
            bufferLength={analyser.bufferLength}
          />
          {/* <SpectrumAnalyser
            className='spectrum-analyser'
            isPlaying={isPlaying}
            analyser={analyser.analyser}
            dataArray={analyser.dataArray}
            bufferLength={analyser.bufferLength}
          /> */}
        </>
      ) : null}
      <TextScroll className='text-scroll' text={`${currentTrack.title} - ${currentTrack.artist} *** `} />
      <FrequenciesWrapper>
        <Text text={currentTrack.bitRate.toString()} />
        <Text text={currentTrack.sampleRate.toString()} />
      </FrequenciesWrapper>
      <MonoStereo className='mono-stereo' />
      <TimeDisplay className='time-display' totalTime={totalTime} playTime={playTime} />
      <VolumeControl className='volume-control' volume={volume} setVolume={setVolume} />
    </Wrapper>
  );
};

export default Winamp;
