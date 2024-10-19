import { useState } from 'react';
import LeftPane from './components/LeftPane';
import RightPane from './components/RightPane';
import config from './config.json';
import PasscodeInput from './components/PasscodeInput';

function App() {
  const [isExamActive, setIsExamActive] = useState(false);
  const [isExamEnded, setIsExamEnded] = useState(false);
  const [passcode, setPasscode] = useState<string>('*');


  const [showPasscodeInput, setShowPasscodeInput] = useState(true);

  const handlePasscodeSubmit = (inputPasscode: string) => {
    setPasscode(inputPasscode);
    setShowPasscodeInput(false);
  };

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
      {showPasscodeInput ? (
      <PasscodeInput onPasscodeSubmit={handlePasscodeSubmit} />
      ) : (
      <>
        <LeftPane onExamStatusChange={handleExamStatusChange} />
        <RightPane examActive={isExamActive} examEnded={isExamEnded} passcode={passcode} ip={config.ip} />
      </>
      )}
    </div>
  );
}

export default App;