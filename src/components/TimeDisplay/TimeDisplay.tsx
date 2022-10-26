// Image
import NumbersImageMap from 'assets/NUMBERS.BMP';
// Styles
import { Wrapper } from './TimeDisplay.styles';

const NUMBER_WIDTH = 9;
const NUMBER_HEIGTH = 13;

const TimeDisplay = () => (
  <canvas
    ref={canvas => {
      if (canvas) {
        const context = canvas.getContext('2d');

        const image = document.createElement('img');
        image.src = NumbersImageMap;

        const number = 0;

        image.onload = () => {
          context?.clearRect(0, 0, image.width, image.height);

          // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

          context?.drawImage(image, NUMBER_WIDTH * number, 0, NUMBER_WIDTH, NUMBER_HEIGTH, 0, 0, NUMBER_WIDTH, NUMBER_HEIGTH);
          context?.drawImage(image, NUMBER_WIDTH * number, 0, NUMBER_WIDTH, NUMBER_HEIGTH, NUMBER_WIDTH + 3, 0, NUMBER_WIDTH, NUMBER_HEIGTH);

          context?.drawImage(image, NUMBER_WIDTH * number, 0, NUMBER_WIDTH, NUMBER_HEIGTH, NUMBER_WIDTH * 2 + 10, 0, NUMBER_WIDTH, NUMBER_HEIGTH);
          context?.drawImage(image, NUMBER_WIDTH * number, 0, NUMBER_WIDTH, NUMBER_HEIGTH, NUMBER_WIDTH * 3 + 13, 0, NUMBER_WIDTH, NUMBER_HEIGTH);
        };
      }
    }}
    // width={IMAGE_WIDTH}
    // height={IMAGE_HEIGTH / 2}
  />
);

export default TimeDisplay;
