// Images
import { mainImageMap, titleBarImageMap, playPauseImageMap } from 'imageImports';
// Components
import CanvasImage from 'components/CanvasImage/CanvasImage';
// Styles
import { Wrapper } from './BaseImages.styles';

const getImages = (isPlaying: boolean, isPaused: boolean) => [
  {
    imageFile: mainImageMap,
    width: 275,
    height: 116,
    startCoords: {
      x: 0,
      y: 0
    }
  },
  {
    imageFile: titleBarImageMap,
    className: 'title-bar',
    width: 275,
    height: 14,
    startCoords: {
      x: 27,
      y: 0
    }
  },
  {
    imageFile: titleBarImageMap,
    className: 'display-buttons',
    width: 7,
    height: 43,
    startCoords: {
      x: 305,
      y: 0
    }
  },
  {
    imageFile: playPauseImageMap,
    className: 'play-pause-button',
    width: 9,
    height: 9,
    startCoords: {
      x: isPlaying ? 0 : isPaused ? 9 : 18,
      y: 0
    }
  }
];

type Props = {
  isPlaying: boolean;
  isPaused: boolean;
};

const BaseImages = ({ isPlaying, isPaused }: Props) => {
  const images = getImages(isPlaying, isPaused);

  return (
    <Wrapper>
      {images.map((image, i) => (
        <CanvasImage
          key={i}
          className={image.className}
          imageFile={image.imageFile}
          width={image.width}
          height={image.height}
          startCoords={image.startCoords}
        />
      ))}
    </Wrapper>
  );
};

export default BaseImages;
