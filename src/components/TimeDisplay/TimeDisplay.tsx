// Image
import NumbersImageMap from 'assets/NUMBERS.BMP';
// Helpers
import { drawImageOnCanvas, getTime1s, getTime10s } from 'helpers';

type Props = {
  seconds: number;
  minutes: number;
  className?: string;
};

const NUMBER_WIDTH = 9;
const NUMBER_HEIGHT = 13;

const TimeDisplay = ({ seconds, minutes, className = '' }: Props) => (
  <canvas
    className={className}
    ref={canvas => {
      const digitCoords = [
        {
          sourceX: NUMBER_WIDTH * getTime10s(minutes),
          destinationX: 0
        },
        {
          sourceX: NUMBER_WIDTH * getTime1s(minutes),
          destinationX: NUMBER_WIDTH + 3
        },
        {
          sourceX: NUMBER_WIDTH * getTime10s(seconds),
          destinationX: NUMBER_WIDTH * 2 + 10
        },
        {
          sourceX: NUMBER_WIDTH * getTime1s(seconds),
          destinationX: NUMBER_WIDTH * 3 + 13
        }
      ];

      if (canvas) {
        digitCoords.forEach(digit => {
          drawImageOnCanvas(NumbersImageMap, canvas, {
            sourceX: digit.sourceX,
            sourceY: 0,
            sourceWidth: NUMBER_WIDTH,
            sourceHeight: NUMBER_HEIGHT,
            destinationX: digit.destinationX,
            destinationY: 0,
            destinationWidth: NUMBER_WIDTH,
            destinationHeight: NUMBER_HEIGHT
          }, false);
        });
      }
    }}
    width={50}
    height={15}
  />
);

export default TimeDisplay;
