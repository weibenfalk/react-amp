// Image
import MonoStereoImage from 'assets/MONOSTER.BMP';

type Props = {
  mono?: boolean;
  stereo?: boolean;
  className?: string;
};

const IMAGE_WIDTH = 58;
const IMAGE_HEIGTH = 24;

const MonoStereo = ({ mono = false, stereo = true, className = '' }: Props) => (
  <canvas
    className={className}
    ref={canvas => {
      if (canvas) {
        const context = canvas.getContext('2d');

        const image = document.createElement('img');
        image.src = MonoStereoImage;

        image.onload = () => {
          const elementWidth = IMAGE_WIDTH / 2;
          const elementHeigth = IMAGE_HEIGTH / 2;

          const monoXstart = elementWidth;
          const monoYstart = mono ? 0 : elementHeigth;

          const stereoXstart = 0;
          const stereoYstart = stereo ? 0 : elementHeigth;

          context?.clearRect(0, 0, image.width, image.height);

          // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

          context?.drawImage(
            image,
            monoXstart,
            monoYstart,
            elementWidth,
            elementHeigth,
            0,
            0,
            elementWidth,
            elementHeigth
          );
          context?.drawImage(
            image,
            stereoXstart,
            stereoYstart,
            elementWidth,
            elementHeigth,
            elementWidth,
            0,
            elementWidth,
            elementHeigth
          );
        };
      }
    }}
    width={IMAGE_WIDTH}
    height={IMAGE_HEIGTH / 2}
  />
);

export default MonoStereo;
