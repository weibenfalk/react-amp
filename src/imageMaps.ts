// Image
import {
  posBarImageMap,
  volumeImageMap,
  monoStereoImageMap,
  mainImageMap,
  titleBarImageMap,
  playPauseImageMap,
  controlButtonsImageMap
} from 'imageImports';

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

export const controlButtonsMap: ImageMapType = {
  imageMap: controlButtonsImageMap as string,
  images: [
    {
      x: 0,
      y: 0,
      width: 22,
      height: 18
    },
    {
      x: 0,
      y: 18,
      width: 22,
      height: 18
    },
    {
      x: 23,
      y: 0,
      width: 22,
      height: 18
    },
    {
      x: 23,
      y: 18,
      width: 22,
      height: 18
    },
    {
      x: 46,
      y: 0,
      width: 22,
      height: 18
    },
    {
      x: 46,
      y: 18,
      width: 22,
      height: 18
    },
    {
      x: 69,
      y: 0,
      width: 22,
      height: 18
    },
    {
      x: 69,
      y: 18,
      width: 22,
      height: 18
    },
    {
      x: 92,
      y: 0,
      width: 22,
      height: 18
    },
    {
      x: 92,
      y: 18,
      width: 22,
      height: 18
    },
    {
      x: 114,
      y: 0,
      width: 22,
      height: 16
    },
    {
      x: 114,
      y: 16,
      width: 22,
      height: 16
    }
  ]
};

export const playPauseStopMap: ImageMapType = {
  imageMap: playPauseImageMap,
  images: [
    {
      x: 0,
      y: 0,
      width: 9,
      height: 9
    },
    {
      x: 9,
      y: 0,
      width: 9,
      height: 9
    },
    {
      x: 18,
      y: 0,
      width: 9,
      height: 9
    }
  ]
};

export const titleBarMap: ImageMapType = {
  imageMap: titleBarImageMap as string,
  images: [
    {
      x: 27,
      y: 0,
      width: 275,
      height: 14
    },
    {
      x: 305,
      y: 0,
      width: 7,
      height: 43
    }
  ]
};

export const mainMap: ImageMapType = {
  imageMap: mainImageMap as string,
  images: [
    {
      x: 0,
      y: 0,
      width: 275,
      height: 116
    }
  ]
};

export const monoStereoMap: ImageMapType = {
  imageMap: monoStereoImageMap as string,
  images: [
    {
      x: 0,
      y: 0,
      width: 29,
      height: 12
    },
    {
      x: 0,
      y: 12,
      width: 29,
      height: 12
    },
    {
      x: 29,
      y: 0,
      width: 29,
      height: 12
    },
    {
      x: 29,
      y: 12,
      width: 29,
      height: 12
    }
  ]
};

export const volumeKnobMap: ImageMapType = {
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
