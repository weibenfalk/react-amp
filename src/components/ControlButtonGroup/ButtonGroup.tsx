// Components
import ControlButton from 'components/ControlButton/ControlButton';
// Types
import { ButtonType } from 'components/ControlButton/ControlButton';
// Styles
import { Wrapper } from './ButtonGroup.styles';

type Props = {
  handlePlay: () => void;
  handleStop: () => void;
  handlePause: () => void;
  handlePreviousTrack: () => void;
  handleNextTrack: () => void;
  className?: string;
};

const ControlButtonGroup = ({
  handlePlay,
  handleStop,
  handlePause,
  handlePreviousTrack,
  handleNextTrack,
  className = ''
}: Props) => (
  <Wrapper className={className}>
    <ControlButton type={ButtonType.previous} clickHandler={handlePreviousTrack} />
    <ControlButton type={ButtonType.play} clickHandler={handlePlay} />
    <ControlButton type={ButtonType.pause} clickHandler={handlePause} />
    <ControlButton type={ButtonType.stop} clickHandler={handleStop} />
    <ControlButton type={ButtonType.next} clickHandler={handleNextTrack} />
    <ControlButton className='eject-button' type={ButtonType.eject} clickHandler={() => console.log('Eject!')} />
  </Wrapper>
);

export default ControlButtonGroup;
