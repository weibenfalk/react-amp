// Components
import Button from 'components/Button/Button';
import CanvasButton from 'components/CanvasButton/CanvasButton';
// Types
import { ButtonType } from 'components/CanvasButton/CanvasButton';
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

const ButtonGroup = ({
  handlePlay,
  handleStop,
  handlePause,
  handlePreviousTrack,
  handleNextTrack,
  className = ''
}: Props) => (
  <Wrapper className={className}>
    <CanvasButton type={ButtonType.previous} clickHandler={handlePreviousTrack} />
    <CanvasButton type={ButtonType.play} clickHandler={handlePlay} />
    <CanvasButton type={ButtonType.pause} clickHandler={handlePause} />
    <CanvasButton type={ButtonType.stop} clickHandler={handleStop} />
    <CanvasButton type={ButtonType.next} clickHandler={handleNextTrack} />
  </Wrapper>
);

export default ButtonGroup;
