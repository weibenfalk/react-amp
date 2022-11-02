type Coords = {
  sourceX: number;
  sourceY: number;
  sourceWidth: number;
  sourceHeight: number;
  destinationX: number;
  destinationY: number;
  destinationWidth: number;
  destinationHeight: number;
};

export const drawImageOnCanvas = (imageMap: string, canvas: HTMLCanvasElement, coords: Coords, clear = true): void => {
  const image = document.createElement('img');
  image.src = imageMap;

  image.onload = () => {
    const context = canvas.getContext('2d');

    if (context) {
      context.imageSmoothingEnabled = false;
      if (clear) context.clearRect(0, 0, canvas.width, canvas.height);

      context.drawImage(
        image,
        coords.sourceX,
        coords.sourceY,
        coords.sourceWidth,
        coords.sourceHeight,
        coords.destinationX,
        coords.destinationY,
        coords.destinationWidth,
        coords.destinationHeight
      );
    }
  };
};
