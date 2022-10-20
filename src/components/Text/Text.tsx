// Styles
import { Wrapper } from './Text.styles';

type Props = {
  text: string;
};

const Text = ({ text }: Props) => (
  <Wrapper>
    <p>{text}</p>
  </Wrapper>
);

export default Text;
