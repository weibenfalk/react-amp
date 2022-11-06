// Components
import TextCanvas from 'components/TextCanvas/TextCanvas';
// Styles
import { Wrapper } from './TextScroll.styles';

type Props = {
  text: string;
  className?: string;
};

const TextDisplay = ({ text, className = '' }: Props) => (
  <Wrapper className={className}>
    <div className='container'>
      <TextCanvas text={text} />
      <TextCanvas text={text} />
      <TextCanvas text={text} />
    </div>
    <div className='container'>
      <TextCanvas text={text} />
      <TextCanvas text={text} />
      <TextCanvas text={text} />
    </div>
  </Wrapper>
);

export default TextDisplay;
