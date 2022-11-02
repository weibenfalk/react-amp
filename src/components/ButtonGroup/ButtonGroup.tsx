// Components
import Button from 'components/Button/Button';
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
    <Button type='previous' clickHandler={handlePreviousTrack} />
    <Button type='play' clickHandler={handlePlay} />
    <Button type='pause' clickHandler={handlePause} />
    <Button type='stop' clickHandler={handleStop} />
    <Button type='next' clickHandler={handleNextTrack} />
  </Wrapper>
);

export default ButtonGroup;
