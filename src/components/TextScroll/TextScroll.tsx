// Styles
import { Wrapper } from './TextScroll.styles';

type Props = {
  text: string;
  className?: string;
};

const TextDisplay = ({ text, className = '' }: Props) => (
  <Wrapper className={className}>
    <div className='container'>
      <p>{text}</p>
      <p>{text}</p>
      <p>{text}</p>
    </div>
    <div className='container'>
      <p>{text}</p>
      <p>{text}</p>
      <p>{text}</p>
    </div>
  </Wrapper>
);

export default TextDisplay;
