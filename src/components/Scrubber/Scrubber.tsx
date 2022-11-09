import React from 'react';
// Components
import RangeSlider from 'components/RangeSlider/RangeSlider';
// Hooks
import { useGetImagesDataUrl } from 'hooks/useGetImagesDataUrl';
// Images
import { scrubberMap, scrubberBgMap } from 'imageMaps';
// Styles
import { Wrapper } from './Scrubber.styles';

type Props = {
  playtime: number;
  totalTime: number;
  isDraggingScrubber: boolean;
  setIsDraggingScrubber: React.Dispatch<React.SetStateAction<boolean>>;
  displayHandle: boolean;
  handleScrubRelease: (value: number) => void;
  className?: string;
};

const Scrubber = ({
  playtime,
  totalTime,
  isDraggingScrubber,
  setIsDraggingScrubber,
  displayHandle,
  handleScrubRelease,
  className
}: Props) => {
  const [bgImage] = useGetImagesDataUrl(scrubberBgMap);
  const [handlePos, setHandlePos] = React.useState(0);

  const handleMouseUp = (value: number) => {
    handleScrubRelease(value);
    setIsDraggingScrubber(false);
  };

  const handleMouseDown = (value: number) => setIsDraggingScrubber(true);

  React.useEffect(() => {
    if (!isDraggingScrubber) {
      if (!playtime || !totalTime) {
        setHandlePos(0);
        return;
      }

      setHandlePos(Math.round((playtime / totalTime) * 100));
    }
  }, [playtime, totalTime]);

  return (
    <Wrapper className={className}>
      <img className='background' src={bgImage} />
      {displayHandle ? (
        <RangeSlider
          className='slider'
          knobImages={scrubberMap}
          width={249}
          height={10}
          min={0}
          max={100}
          step={1}
          value={handlePos}
          handleOnChange={setHandlePos}
          handleMouseUp={handleMouseUp}
          handleMouseDown={handleMouseDown}
        />
      ) : null}
    </Wrapper>
  );
};

export default Scrubber;
