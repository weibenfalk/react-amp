import React from 'react';
// Image
import NumbersImageMap from 'assets/NUMBERS.BMP';
// Helpers
import { getTime1s, getTime10s } from 'helpers';

type Props = {
  totalTime: number;
  playTime: number;
  className?: string;
};

const NUMBER_WIDTH = 9;
const NUMBER_HEIGHT = 13;

const TimeDisplay = ({ totalTime, playTime, className = '' }: Props) => {
  const [isTimeLeft, setIsTimeLeft] = React.useState(false);

  const displayedTime = isTimeLeft ? totalTime - playTime : playTime;

  const seconds = displayedTime % 60;
  const minutes = Math.floor((displayedTime / 60) % 60);

  const handleClick = () => setIsTimeLeft(prev => !prev);

  return (
    <>
      <canvas
        onClick={handleClick}
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
            const image = document.createElement('img');
            image.src = NumbersImageMap;

            image.onload = () => {
              const context = canvas.getContext('2d');

              if (context) {
                // Clear minus if time is not set to display remaining time
                context.clearRect(0, 0, 6, 15);

                if (context && isTimeLeft) {
                  context.globalAlpha = 1;
                  context.beginPath();
                  context.moveTo(0, 7);
                  context.lineTo(6, 7);
                  context.strokeStyle = '#00e800';
                  context.stroke();
                }
                
                digitCoords.forEach(digit => {
                  context.drawImage(
                    image,
                    digit.sourceX,
                    0,
                    NUMBER_WIDTH,
                    NUMBER_HEIGHT,
                    digit.destinationX + 12,
                    0,
                    NUMBER_WIDTH,
                    NUMBER_HEIGHT
                  );
                });
              }
            };
          }
        }}
        width={61}
        height={15}
      />
    </>
  );
};

export default TimeDisplay;
