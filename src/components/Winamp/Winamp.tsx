import React from 'react';
// Components
import CanvasImage from 'components/CanvasImage/CanvasImage';
import ControlButtonGroup from 'components/ControlButtonGroup/ButtonGroup';
import ShufRepButton from 'components/ShufRepButton/ShufRepButton';
import TextDisplay from 'components/TextDisplay/TextDisplay';
import MonoStereo from 'components/MonoStereo/MonoStereo';
import TimeDisplay from 'components/TimeDisplay/TimeDisplay';
import VolumeControl from 'components/VolumeControl/VolumeControl';
import AudioVisualiser from 'components/AudioVisualiser/AudioVisualiser';
import TextCanvas from 'components/TextCanvas/TextCanvas';
// Hooks
import { useCreateAudio } from 'hooks/useCreateAudio';
import { useCreateAnalyser } from 'hooks/useCreateAnalyser';
// Helpers
import { getTotalTimeInMinsAndSecs } from 'helpers';
// Images
import { mainImageMap, titleBarImageMap, playPauseImageMap } from 'imageImports';
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

  const handleVisualisationChange = () => {
    setIsBars(prev => !prev);
  };

  return (
    <Wrapper isPaused={isPaused}>
      <CanvasImage imageFile={mainImageMap} width={275} height={116} startCoords={{ x: 0, y: 0 }} />
      <CanvasImage
        className='title-bar'
        imageFile={titleBarImageMap}
        width={275}
        height={14}
        startCoords={{ x: 27, y: 0 }}
      />
      <CanvasImage
        className='display-buttons'
        imageFile={titleBarImageMap}
        width={7}
        height={43}
        startCoords={{ x: 305, y: 0 }}
      />
      <CanvasImage
        className='play-pause-button'
        imageFile={playPauseImageMap}
        width={9}
        height={9}
        startCoords={{ x: isPlaying ? 0 : isPaused ? 9 : 18, y: 0 }}
      />
      <audio
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => handleTrackChange(trackNr < tracks.length - 1)}
        ref={audioRef}
      >
        <source src={currentTrack.file} />
        Your browser does not support the <code>audio</code> element.
      </audio>
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
      </div>
      {analyser && analyser.analyser && analyser.dataArray ? (
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
      <TimeDisplay className='time-display' totalTime={totalTime} playTime={playTime} />
      <VolumeControl
        className='volume-control'
        volume={volume}
        setVolume={setVolume}
        isDraggingVolume={isDraggingVolume}
        setIsDraggingVolume={setIsDraggingVolume}
      />
    </Wrapper>
  );
};

export default Winamp;
