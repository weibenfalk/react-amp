// Components
import Button from 'components/Button/Button';
// Types
import { ButtonType } from 'components/Button/Button';
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
    <Button type={ButtonType.previous} clickHandler={handlePreviousTrack} />
    <Button type={ButtonType.play} clickHandler={handlePlay} />
    <Button type={ButtonType.pause} clickHandler={handlePause} />
    <Button type={ButtonType.stop} clickHandler={handleStop} />
    <Button type={ButtonType.next} clickHandler={handleNextTrack} />
    <Button className='eject-button' type={ButtonType.eject} clickHandler={() => console.log('Eject!')} />
  </Wrapper>
);

export default ButtonGroup;
