// Components
import Winamp from './components/Winamp/Winamp';
// Context 
import { StateContextProvider } from 'context';
// Global Styles
import { GlobalStyle } from 'styles/globalStyles';

const App = () => {
  return (
    <StateContextProvider>
      <GlobalStyle />
      <Winamp />
    </StateContextProvider>
  );
};

export default App;
