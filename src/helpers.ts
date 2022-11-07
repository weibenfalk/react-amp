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

// [x, y, width, height]
export const characterMap = {
  a: [0, 0, 4, 6],
  b: [5, 0, 4, 6],
  c: [10, 0, 4, 6],
  d: [15, 0, 4, 6],
  e: [20, 0, 4, 6],
  f: [25, 0, 4, 6],
  g: [30, 0, 4, 6],
  h: [35, 0, 4, 6],
  i: [40, 0, 4, 6],
  j: [45, 0, 4, 6],
  k: [50, 0, 4, 6],
  l: [55, 0, 4, 6],
  m: [60, 0, 4, 6],
  n: [65, 0, 4, 6],
  o: [70, 0, 4, 6],
  p: [75, 0, 4, 6],
  q: [80, 0, 4, 6],
  r: [85, 0, 4, 6],
  s: [90, 0, 4, 6],
  t: [95, 0, 4, 6],
  u: [100, 0, 4, 6],
  v: [105, 0, 4, 6],
  w: [110, 0, 4, 6],
  x: [115, 0, 4, 6],
  y: [120, 0, 4, 6],
  z: [125, 0, 4, 6],
  '"': [130, 0, 5, 6],
  '@': [136, 0, 6, 6],
  0: [0, 6, 4, 6],
  1: [5, 6, 4, 6],
  2: [10, 6, 4, 6],
  3: [15, 6, 4, 6],
  4: [20, 6, 4, 6],
  5: [25, 6, 4, 6],
  6: [30, 6, 4, 6],
  7: [35, 6, 4, 6],
  8: [40, 6, 4, 6],
  9: [45, 6, 4, 6],
  '.': [50, 6, 1, 6],
  _: [54, 6, 3, 6],
  ':': [60, 6, 4, 6],
  '(': [67, 6, 2, 6],
  ')': [70, 6, 2, 6],
  '-': [75, 6, 4, 6],
  "'": [82, 6, 3, 6],
  '!': [87, 6, 1, 6],
  '+': [96, 6, 5, 6],
  '\\': [101, 6, 5, 6],
  '/': [106, 6, 5, 6],
  '[': [112, 6, 4, 6],
  ']': [116, 6, 4, 6],
  '´': [120, 6, 3, 6],
  '`': [123, 6, 3, 6],
  '&': [127, 6, 4, 6],
  '%': [132, 6, 4, 6],
  ',': [137, 6, 3, 6],
  '=': [142, 6, 3, 6],
  $: [147, 6, 3, 6],
  '€': [151, 6, 4, 6],
  å: [0, 12, 4, 6],
  ö: [5, 12, 4, 6],
  ä: [10, 12, 4, 6],
  '?': [15, 12, 4, 6],
  '*': [20, 12, 4, 6]
};

export const getTime1s = (value: number) => Math.floor(value % 10);
export const getTime10s = (value: number) => Math.floor(value / 10) % 60;

export const getTotalTimeInMinsAndSecs = (totalTime: number): string => {
  const seconds = totalTime % 60;
  const minutes = Math.floor((totalTime / 60) % 60);

  return `${getTime1s(minutes)}:${getTime10s(seconds)}${getTime1s(seconds)}`;
};

export const drawImageOnCanvas = (imageMap: string, canvas: HTMLCanvasElement, coords: Coords, clear = true): void => {
  const image = document.createElement('img');
  image.src = imageMap;

  image.onload = () => {
    const context = canvas.getContext('2d');

    if (context) {
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
