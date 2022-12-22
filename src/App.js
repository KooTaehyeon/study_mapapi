import Router from './Routes';
import GlobalStyles from './Components/GlobalStyles/GlobalStyles';
import { schoolApi } from './Context/globalContext';
import { useState } from 'react';

function App() {
  const [apiData, setApiData] = useState('ㅎㅎ');

  return (
    <>
      <schoolApi.Provider value={{ apiData, setApiData }}>
        <GlobalStyles />
        <Router />
      </schoolApi.Provider>
    </>
  );
}

export default App;
