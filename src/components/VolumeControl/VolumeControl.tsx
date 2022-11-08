import React from 'react';
// Components
import RangeSlider from 'components/RangeSlider/RangeSlider';
// Hooks
import { useGetImagesDataUrl } from 'hooks/useGetImagesDataUrl';
// Images
import { volumeKnobMap, volumeBgMap } from 'imageMaps';
// Styles
import { Wrapper } from './VolumeControl.styles';

type Props = {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  isDraggingVolume: boolean;
  setIsDraggingVolume: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
};

const VolumeControl = ({ volume, setVolume, setIsDraggingVolume, className }: Props) => {
  const bgImages = useGetImagesDataUrl(volumeBgMap);

  return (
    <Wrapper className={className}>
      <img className="background" src={bgImages[Math.floor(volume / 0.0358)]} />
      <RangeSlider
        className='slider'
        knobImages={volumeKnobMap}
        width={65}
        height={14}
        min={0}
        max={1}
        step={0.01}
        value={volume}
        setValue={setVolume}
        setIsDragging={setIsDraggingVolume}
      />
    </Wrapper>
  );
};

export default VolumeControl;
