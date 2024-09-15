import { useState, useEffect } from 'react';
import LeftPane from './components/LeftPane';
import RightPane from './components/RightPane';
import config from './config.json';

function App() {
  const [isExamActive, setIsExamActive] = useState(false);
  const [isExamEnded, setIsExamEnded] = useState(false);
  const [passcode, setPasscode] = useState<string>('*');

  useEffect(() => {
    const passcode = window.prompt('Please enter a sync code:') ?? Math.random().toString(36).substring(5);
    setPasscode(passcode);
  }, []);

  const handleExamStatusChange = (status: string) => {
    if (status === 'inactive') {
      setIsExamActive(false);
      setIsExamEnded(false);
    } else if (status === 'active') {
      setIsExamActive(true);
      setIsExamEnded(false);
    } else if (status === 'ended') {
      setIsExamActive(false);
      setIsExamEnded(true);
    }
  };

  // Render the LeftPane and RightPane components
  return (
    <div className="App">
      <LeftPane onExamStatusChange={handleExamStatusChange} />
      <RightPane examActive={isExamActive} examEnded={isExamEnded} passcode={passcode} ip={config.ip} />
    </div>
  );
}

export default App;