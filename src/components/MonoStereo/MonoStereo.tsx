// Image
import MonoStereoImage from 'assets/MONOSTER.BMP';
// Helpers
import { drawImageOnCanvas } from 'helpers';

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
        const elementWidth = IMAGE_WIDTH / 2;
        const elementHeigth = IMAGE_HEIGTH / 2;

        const monoXstart = elementWidth;
        const monoYstart = mono ? 0 : elementHeigth;

        const stereoXstart = 0;
        const stereoYstart = stereo ? 0 : elementHeigth;

        drawImageOnCanvas(MonoStereoImage, canvas, {
          sourceX: monoXstart,
          sourceY: monoYstart,
          sourceWidth: elementWidth,
          sourceHeight: elementHeigth,
          destinationX: 0,
          destinationY: 0,
          destinationWidth: elementWidth,
          destinationHeight: elementHeigth
        }, false);

        drawImageOnCanvas(MonoStereoImage, canvas, {
          sourceX: stereoXstart,
          sourceY: stereoYstart,
          sourceWidth: elementWidth,
          sourceHeight: elementHeigth,
          destinationX: elementWidth,
          destinationY: 0,
          destinationWidth: elementWidth,
          destinationHeight: elementHeigth
        }, false);
      }
    }}
    width={IMAGE_WIDTH}
    height={IMAGE_HEIGTH / 2}
  />
);

export default MonoStereo;
