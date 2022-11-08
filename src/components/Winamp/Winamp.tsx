import React from 'react';
// Components
import BaseImages from 'components/BaseImages/BaseImages';
import ControlButtonGroup from 'components/ControlButtonGroup/ButtonGroup';
import ShufRepButton from 'components/ShufRepButton/ShufRepButton';
import TextDisplay from 'components/TextDisplay/TextDisplay';
import MonoStereo from 'components/MonoStereo/MonoStereo';
import TimeDisplay from 'components/TimeDisplay/TimeDisplay';
import VolumeControl from 'components/VolumeControl/VolumeControl';
import AudioVisualiser from 'components/AudioVisualiser/AudioVisualiser';
import TextCanvas from 'components/TextCanvas/TextCanvas';
import RangeSlider from 'components/RangeSlider/RangeSlider';
import NewVolumeControl from 'components/NewVolumeControl/NewVolumeControl';
// Hooks
import { useCreateAudio } from 'hooks/useCreateAudio';
import { useCreateAnalyser } from 'hooks/useCreateAnalyser';
// Helpers
import { getTotalTimeInMinsAndSecs } from 'helpers';
import { volumeKnobMap } from 'imageMaps';
// Tracks
import { tracks } from 'tracks';
// Types
import { VisualiserType } from 'components/AudioVisualiser/AudioVisualiser';
import { ShufRepButtonType } from 'components/ShufRepButton/ShufRepButton';
// Styles
import { Wrapper, FrequenciesWrapper } from './Winamp.styles';

const Winamp = () => {
  const audioRef = React.useRef<HTMLMediaElement>(null);

  const [currentTrack, setCurrentTrack] = React.useState(tracks[0]);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [volume, setVolume] = React.useState(1);
  const [isBars, setIsBars] = React.useState(true);
  const [isDraggingVolume, setIsDraggingVolume] = React.useState(false);
  const [isShuffle, setIsShuffle] = React.useState(false);
  const [isRepeat, setIsRepeat] = React.useState(false);
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
    if (isShuffle) {
      const randomTrackNr = Math.floor(Math.random() * tracks.length);
      const newTrack = tracks[randomTrackNr];
      setCurrentTrack(newTrack);
    } else if (shouldChangeTrack) {
      const newTrack = forward ? tracks[trackNr + 1] : tracks[trackNr - 1];
      setCurrentTrack(newTrack);
    }

    audioRef.current?.load();

    if (isPlaying || isPaused) {
      play();
      setIsPaused(false);
      setIsPlaying(true);
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

  const handleOnEnd = () => {
    if (audioRef.current && isRepeat) {
      audioRef.current.currentTime = 0;
      play();
      return;
    }

    handleTrackChange(trackNr < tracks.length - 1);
  };

  const handleVisualisationChange = () => setIsBars(prev => !prev);

  return (
    <Wrapper isPaused={isPaused}>
      <audio onTimeUpdate={handleTimeUpdate} onEnded={handleOnEnd} ref={audioRef}>
        <source src={currentTrack.file} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <BaseImages isPlaying={isPlaying} isPaused={isPaused} />
      <ControlButtonGroup
        className='button-group'
        handlePlay={handlePlay}
        handleStop={handleStop}
        handlePause={handlePause}
        handlePreviousTrack={() => handleTrackChange(trackNr > 0, false)}
        handleNextTrack={() => handleTrackChange(trackNr < tracks.length - 1)}
      />
      <div className='shuf-rep-buttons'>
        <ShufRepButton
          type={ShufRepButtonType.shuffle}
          active={isShuffle}
          clickHandler={() => setIsShuffle(prev => !prev)}
        />
        <ShufRepButton
          type={ShufRepButtonType.repeat}
          active={isRepeat}
          clickHandler={() => setIsRepeat(prev => !prev)}
        />
      </div>
      {analyser && analyser.analyser && analyser.dataArray && (isPlaying || isPaused) ? (
        <div onClick={handleVisualisationChange}>
          <AudioVisualiser
            className='spectrum-analyser'
            isPlaying={isPlaying}
            analyser={analyser.analyser}
            dataArray={analyser.dataArray}
            bufferLength={analyser.bufferLength}
            type={isBars ? VisualiserType.BAR : VisualiserType.OSC}
          />
        </div>
      ) : null}
      <TextDisplay
        className='text-scroll'
        text={
          isDraggingVolume
            ? `Volume: ${Math.round(volume * 100)}%`
            : `${currentTrack.title} - ${currentTrack.artist} (${getTotalTimeInMinsAndSecs(totalTime)}) *** `
        }
        isScroll={!isDraggingVolume}
      />
      <FrequenciesWrapper>
        <TextCanvas text={currentTrack.bitRate.toString()} />
        <TextCanvas text={currentTrack.sampleRate.toString()} />
      </FrequenciesWrapper>
      <MonoStereo className='mono-stereo' />
      {isPlaying || isPaused ? (
        <TimeDisplay className='time-display' totalTime={totalTime} playTime={playTime} />
      ) : null}
      {/* <VolumeControl
        className='volume-control'
        volume={volume}
        setVolume={setVolume}
        isDraggingVolume={isDraggingVolume}
        setIsDraggingVolume={setIsDraggingVolume}
      /> */}
      <NewVolumeControl
        className='volume-control'
        volume={volume}
        setVolume={setVolume}
        isDraggingVolume={isDraggingVolume}
        setIsDraggingVolume={setIsDraggingVolume}
      />
      <RangeSlider
        knobImages={volumeKnobMap}
        width={400}
        height={10}
        value={playTime}
        setValue={setPlayTime}
        setIsDragging={setIsDraggingVolume}
      />
    </Wrapper>
  );
};

export default Winamp;
