import React from 'react';
// Components
import BaseImages from 'components/BaseImages/BaseImages';
import ControlButtonGroup from 'components/ControlButtonGroup/ButtonGroup';
import ShufRepButton from 'components/ShufRepButton/ShufRepButton';
import TextDisplay from 'components/TextDisplay/TextDisplay';
import MonoStereo from 'components/MonoStereo/MonoStereo';
import TimeDisplay from 'components/TimeDisplay/TimeDisplay';
import VolumeControl from 'components/VolumeControl/VolumeControl';
import PanControl from 'components/PanControl/PanControl';
import AudioVisualiser from 'components/AudioVisualiser/AudioVisualiser';
import TextCanvas from 'components/TextCanvas/TextCanvas';
import Scrubber from 'components/Scrubber/Scrubber';
// Hooks
import { useCreateAudio } from 'hooks/useCreateAudio';
import { useCreateAnalyser } from 'hooks/useCreateAnalyser';
import { useCallbacks } from './useCallbacks';
import { useStateContext } from 'context';
// Helpers
import { getTotalTimeInMinsAndSecs } from 'helpers';
// Tracks
import { tracks } from 'tracks';
// Types
import { VisualiserType } from 'components/AudioVisualiser/AudioVisualiser';
import { ShufRepButtonType } from 'components/ShufRepButton/ShufRepButton';
// Styles
import { Wrapper, FrequenciesWrapper } from './Winamp.styles';

const Winamp = () => {
  const audioRef = React.useRef<HTMLMediaElement>(null);

  const { context, source, panNode, play, stop, pause } = useCreateAudio(audioRef);
  const analyser = useCreateAnalyser(context, source);
  const { currentTrack, flags, setFlags, metrics, setMetrics } = useStateContext();

  const trackNr = tracks.findIndex(track => track.title === currentTrack.title);
  const callbacks = useCallbacks(audioRef, tracks, trackNr, play, pause, stop);

  const [panValue, setPanValue] = React.useState(0);

  React.useEffect(() => {
    if (audioRef.current) {
      // Volume
      audioRef.current.volume = metrics.volume;
      // Panning
      panNode?.pan.setValueAtTime(panValue, metrics.playtime);
    }
  }, [metrics.volume, panValue, metrics.playtime]);

  return (
    <Wrapper isPaused={flags.isPaused}>
      <audio onTimeUpdate={callbacks.handleTimeUpdate} onEnded={callbacks.handleOnEnd} ref={audioRef}>
        <source src={currentTrack.file} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <BaseImages isPlaying={flags.isPlaying} isPaused={flags.isPaused} />
      <ControlButtonGroup
        className='button-group'
        handlePlay={callbacks.handlePlay}
        handleStop={callbacks.handleStop}
        handlePause={callbacks.handlePause}
        handlePreviousTrack={() => callbacks.handleTrackChange(trackNr > 0, false)}
        handleNextTrack={() => callbacks.handleTrackChange(trackNr < tracks.length - 1)}
      />
      <div className='shuf-rep-buttons'>
        <ShufRepButton
          type={ShufRepButtonType.shuffle}
          active={flags.isShuffle}
          clickHandler={() => setFlags(prev => ({ ...prev, isShuffle: !prev.isShuffle }))}
        />
        <ShufRepButton
          type={ShufRepButtonType.repeat}
          active={flags.isRepeat}
          clickHandler={() => setFlags(prev => ({ ...prev, isRepeat: !prev.isRepeat }))}
        />
      </div>
      {analyser && analyser.analyser && analyser.dataArray && (flags.isPlaying || flags.isPaused) ? (
        <div onClick={callbacks.handleVisualisationChange}>
          <AudioVisualiser
            className='spectrum-analyser'
            isPlaying={flags.isPlaying}
            analyser={analyser.analyser}
            dataArray={analyser.dataArray}
            bufferLength={analyser.bufferLength}
            type={flags.isBars ? VisualiserType.BAR : VisualiserType.OSC}
          />
        </div>
      ) : null}
      <TextDisplay
        className='text-scroll'
        text={
          flags.isDragging
            ? `Volume: ${Math.round(metrics.volume * 100)}%`
            : `${currentTrack.title} - ${currentTrack.artist} (${getTotalTimeInMinsAndSecs(metrics.totalTime)}) *** `
        }
        isScroll={!flags.isDragging}
      />
      <FrequenciesWrapper>
        <TextCanvas text={currentTrack.bitRate.toString()} />
        <TextCanvas text={currentTrack.sampleRate.toString()} />
      </FrequenciesWrapper>
      <MonoStereo stereo={true} className='mono-stereo' />
      {flags.isPlaying || flags.isPaused ? (
        <TimeDisplay className='time-display' totalTime={metrics.totalTime} playtime={metrics.playtime} />
      ) : null}
      <VolumeControl
        className='volume-control'
        volume={metrics.volume}
        setVolume={volume => setMetrics(prev => ({ ...prev, volume }))}
        setIsDraggingVolume={isDragging => setFlags(prev => ({ ...prev, isDragging }))}
      />
      <PanControl
        className='balance-control'
        panValue={panValue}
        setPanValue={setPanValue}
        setIsDraggingBalance={isDragging => setFlags(prev => ({ ...prev, isDragging }))}
      />
      <Scrubber
        className='scrubber'
        scrubtime={metrics.scrubtime}
        setScrubtime={scrubtime => setMetrics(prev => ({ ...prev, scrubtime }))}
        totalTime={metrics.totalTime}
        setIsDraggingScrubber={isDragging => setFlags(prev => ({ ...prev, isDragging }))}
        displayHandle={flags.isPlaying || flags.isPaused}
        handleScrubRelease={callbacks.handleScrubRelease}
      />
    </Wrapper>
  );
};

export default Winamp;
