// Image
import { posBarImageMap, volumeImageMap } from 'imageImports';

export type ImageCoordsType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ImageMapType = {
  imageMap: string;
  images: Array<ImageCoordsType>;
};

const createImages = (width: number, height: number, totalAmount: number, padding: number): Array<ImageCoordsType> => {
  const images = [];

  for (let i = 0; i < totalAmount; i++) {
    images.push({
      x: 0,
      y: i * (height + padding),
      width: width,
      height: height
    });
  }

  return images;
};

export const volumeKnobMap = {
  imageMap: volumeImageMap as string,
  images: [
    {
      x: 15,
      y: 422,
      width: 14,
      height: 11
    },
    {
      x: 0,
      y: 422,
      width: 14,
      height: 11
    }
  ]
};

export const volumeBgMap = {
  imageMap: volumeImageMap as string,
  images: createImages(68, 14, 28, 1)
};
