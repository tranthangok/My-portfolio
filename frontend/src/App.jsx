import { useState } from 'react';
import Navbar from './components/navbar/navbar';
import MainScreen from './components/mainscreen/mainscreen';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  return (
    <div>
      <Navbar 
        language={language}
        setLanguage={setLanguage}
      />
      <MainScreen language={language} />
    </div>
  );
};

export default App;