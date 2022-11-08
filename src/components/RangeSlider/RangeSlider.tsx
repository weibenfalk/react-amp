import React from 'react';
// Hooks
import { useGetImagesDataUrl } from 'hooks/useGetImagesDataUrl';
// Styles
import { Wrapper } from './RangeSlider.styles';
// Types
import { ImageMapType } from 'imageMaps';

type Props = {
  knobImages: ImageMapType;
  width: number;
  height: number;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
};

const RangeSlider = ({
  knobImages,
  width,
  height,
  value,
  setValue,
  setIsDragging,
  min = 0,
  max = 100,
  step = 1,
  className
}: Props) => {
  const [knob, knobClicked] = useGetImagesDataUrl(knobImages);
  const [clicked, setClicked] = React.useState(false);

  const handleMouseDown = () => {
    setClicked(true);
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setClicked(false);
    setIsDragging(false);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.currentTarget.value));
  };

  return (
    <Wrapper
      image={clicked ? knobClicked : knob}
      width={width}
      height={height}
      knobWidth={knobImages.images[0].width}
      knobHeight={knobImages.images[0].height}
    >
      <input
        className={className}
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleValueChange}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </Wrapper>
  );
};

export default RangeSlider;
