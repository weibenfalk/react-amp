// Image
import { posBarImageMap } from 'imageImports';

export type ImageCoordsType = {
  imageMap: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const imagesCoords = {
  scrubHandle: {
    imageMap: posBarImageMap as string,
    x: 249,
    y: 0,
    width: 28,
    height: 10
  },
  scrubHandleClicked: {
    imageMap: posBarImageMap as string,
    x: 278,
    y: 0,
    width: 28,
    height: 10
  }
};
