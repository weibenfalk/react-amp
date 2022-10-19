import React from 'react';
// Components
import SpectrumAnalyser from './components/SpectrumAnalyser/SpectrumAnalyser';
// Hooks
import { useCreateAudio } from './hooks/useCreateAudio';
import { useCreateAnalyser } from './hooks/useCreateAnalyser';

const App = () => {
  const [playing, setPlaying] = React.useState(false);

  const [state, setState] = React.useState(0);
  const [currentTrack, setCurrentTrack] = React.useState('overbord-test-2022.mp3');
  const { context, source, play, stop, pause } = useCreateAudio();
  const analyser = useCreateAnalyser(context, source);

  console.log(analyser?.dataArray);

  const playIt = () => {
    play(currentTrack);
    setPlaying(true);
    // requestAnimationFrame(draw);
  };

  const stopIt = () => {
    stop();
    setPlaying(false);
    // requestAnimationFrame(draw);
  };

  return (
    <div className='App'>
      <div>App</div>
      {analyser ? (
        <SpectrumAnalyser
          analyser={analyser.analyser}
          dataArray={analyser.dataArray}
          bufferLength={analyser.bufferLength}
        />
      ) : null}
      <button onClick={playIt}>Play music</button>
      <button onClick={stopIt}>Stop music</button>
      <button onClick={() => pause()}>Pause music</button>
      <button onClick={() => setState(prev => prev + 1)}>Increase state</button>
    </div>
  );
};

export default App;
