// Styles
import { Wrapper } from './TextScroll.styles';

type Props = {
  text: string;
};

const TextDisplay = ({ text }: Props) => (
  <Wrapper>
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
