import React from 'react';
// Image
import VolumeImageMap from 'assets/VOLUME.BMP';
// Styles
import { Wrapper } from './VolumeControl.styles';

const VOLUMEBAR_WIDTH = 68;
const VOLUMEBAR_HEIGTH = 14;

const VolumeControl = () => {
  const [volume, setVolume] = React.useState(0);

  const handleSliderChange = (element: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(element.currentTarget.value));
  };

  return (
    <Wrapper>
      <input className='volume-slider' type='range' min='0' max='127' value={volume} onChange={handleSliderChange} step='1' />
      <canvas
        ref={canvas => {
          if (canvas) {
            const context = canvas.getContext('2d');

            const image = document.createElement('img');
            image.src = VolumeImageMap;

            image.onload = () => {
              context?.clearRect(0, 0, image.width, image.height);

              // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

              context?.drawImage(
                image,
                0,
                1 * Math.floor(volume / 4.55) * (VOLUMEBAR_HEIGTH + 1), // +1 to compensate for the padding in the image map between images
                VOLUMEBAR_WIDTH,
                VOLUMEBAR_HEIGTH,
                0,
                0,
                VOLUMEBAR_WIDTH,
                VOLUMEBAR_HEIGTH
              );
            };
          }
        }}
        width={68}
        height={14}
      />
    </Wrapper>
  );
};

export default VolumeControl;
