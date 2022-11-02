// Image
import NumbersImageMap from 'assets/NUMBERS.BMP';

type Props = {
  seconds: number;
  minutes: number;
  className?: string;
};

const NUMBER_WIDTH = 9;
const NUMBER_HEIGTH = 13;

const TimeDisplay = ({ seconds, minutes, className = '' }: Props) => (
  <canvas
    className={className}
    ref={canvas => {
      if (canvas) {
        const context = canvas.getContext('2d');

        const image = document.createElement('img');
        image.src = NumbersImageMap;

        const getTime1s = (value: number) => Math.floor(value % 10);
        const getTime10s = (value: number) => Math.floor(value / 10) % 60;

        image.onload = () => {
          // context?.clearRect(0, 0, image.width, image.height);

          // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

          context?.drawImage(
            image,
            NUMBER_WIDTH * getTime10s(minutes),
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
            NUMBER_WIDTH * getTime1s(minutes),
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
            NUMBER_WIDTH * getTime10s(seconds),
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
            NUMBER_WIDTH * getTime1s(seconds),
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
