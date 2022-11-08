type Coords = {
  x: number;
  y: number;
};

type Props = {
  className?: string;
  imageFile: string;
  width: number;
  height: number;
  startCoords: Coords;
};

const CanvasImage = ({ className = '', imageFile, width, height, startCoords }: Props) => (
  <canvas
    className={className}
    ref={canvas => {
      if (canvas) {
        const context = canvas.getContext('2d');

        if (!context) return;

        const image = document.createElement('img');
        image.src = imageFile;

        image.onload = () => {
          context.drawImage(image, startCoords.x, startCoords.y, width, height, 0, 0, width, height);
        };
      }
    }}
    width={width}
    height={height}
  />
);

export default CanvasImage;
