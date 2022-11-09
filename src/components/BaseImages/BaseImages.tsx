// Images
import { mainMap, titleBarMap, playPauseStopMap } from 'imageMaps';
// Hooks
import { useGetImagesDataUrl } from 'hooks/useGetImagesDataUrl';
// Styles
import { Wrapper } from './BaseImages.styles';

type Props = {
  isPlaying: boolean;
  isPaused: boolean;
};

const BaseImages = ({ isPlaying, isPaused }: Props) => {
  const [main] = useGetImagesDataUrl(mainMap);
  const [titleBar, displayMenu] = useGetImagesDataUrl(titleBarMap);
  const [play, pause, stop] = useGetImagesDataUrl(playPauseStopMap);

  return (
    <Wrapper>
      <img className='' src={main} />
      <img className='title-bar' src={titleBar} />
      <img className='display-buttons' src={displayMenu} />
      <img className='play-pause-stop' src={isPlaying ? play : isPaused ? pause : stop} />
    </Wrapper>
  );
};

export default BaseImages;
