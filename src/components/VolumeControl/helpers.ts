type Coords = {
  sourceX: number;
  sourceY: number;
  sourceWidth: number;
  sourceHeigth: number;
  destinationX: number;
  destinationY: number;
  destinationWidth: number;
  destinationHeight: number;
};

export const drawImageOnCanvas = (imageMap: string, canvas: HTMLCanvasElement, coords: Coords): void => {
  const image = document.createElement('img');
  image.src = imageMap;

  image.onload = () => {
    const context = canvas.getContext('2d');
    if (context) {
      context.imageSmoothingEnabled = false;
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.drawImage(
        image,
        coords.sourceX,
        coords.sourceY,
        coords.sourceWidth,
        coords.sourceHeigth,
        coords.destinationX,
        coords.destinationY,
        coords.destinationWidth,
        coords.destinationHeight
      );
    }
  };
};
