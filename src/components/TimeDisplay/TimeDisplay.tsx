// Image
import NumbersImageMap from 'assets/NUMBERS.BMP';

type Props = {
  seconds: number;
  minutes: number;
};

const NUMBER_WIDTH = 9;
const NUMBER_HEIGTH = 13;

const TimeDisplay = ({ seconds, minutes }: Props) => (
  <canvas
    ref={canvas => {
      if (canvas) {
        const context = canvas.getContext('2d');

        const image = document.createElement('img');
        image.src = NumbersImageMap;

        const seconds9s = Math.floor(seconds % 10);
        const seconds10s = Math.floor(seconds / 10) % 60;

        const minutes9s = Math.floor(minutes % 10);
        const minutes10s = Math.floor(minutes / 10) % 60;

        image.onload = () => {
          context?.clearRect(0, 0, image.width, image.height);

          // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

          context?.drawImage(
            image,
            NUMBER_WIDTH * minutes10s,
            0,
            NUMBER_WIDTH,
            NUMBER_HEIGTH,
            0,
            0,
            NUMBER_WIDTH,
            NUMBER_HEIGTH
          );
          context?.drawImage(
            image,
            NUMBER_WIDTH * minutes9s,
            0,
            NUMBER_WIDTH,
            NUMBER_HEIGTH,
            NUMBER_WIDTH + 3,
            0,
            NUMBER_WIDTH,
            NUMBER_HEIGTH
          );

          context?.drawImage(
            image,
            NUMBER_WIDTH * seconds10s,
            0,
            NUMBER_WIDTH,
            NUMBER_HEIGTH,
            NUMBER_WIDTH * 2 + 10,
            0,
            NUMBER_WIDTH,
            NUMBER_HEIGTH
          );
          context?.drawImage(
            image,
            NUMBER_WIDTH * seconds9s,
            0,
            NUMBER_WIDTH,
            NUMBER_HEIGTH,
            NUMBER_WIDTH * 3 + 13,
            0,
            NUMBER_WIDTH,
            NUMBER_HEIGTH
          );
        };
      }
    }}
    width={50}
    height={15}
  />
);

export default TimeDisplay;
