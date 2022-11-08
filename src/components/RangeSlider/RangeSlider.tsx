import React from 'react';
// Hooks
import { useGetImagesDataUrl } from 'hooks/useGetImagesDataUrl';
// Styles
import { Wrapper } from './RangeSlider.styles';
// Image
import { imagesCoords } from 'imagesCoords';

type Props = {
  width: number;
  height: number;
};

const IMAGES = [imagesCoords.scrubHandle, imagesCoords.scrubHandleClicked];

const RangeSlider = ({ width, height }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const [handle] = useGetImagesDataUrl(IMAGES);

  console.log(handle);

  return (
    <Wrapper image={handle}>
      <input
        type='range'
        min='0'
        max='100'
        step='1'
        // value={volume}
        className='range'
        // onChange={(e) => setVolume(Number(e.target.value))}
        // onMouseDown={() => setFocus("volume")}
        // onTouchStart={() => {
        //   setFocus("volume");
        // }}
        // onMouseUp={unsetFocus}
        // onTouchEnd={unsetFocus}
        // title="Volume Bar"
      />
      {/* <canvas ref={canvasRef} width={width} height={height} /> */}
    </Wrapper>
  );
};

export default RangeSlider;
