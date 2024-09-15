import { useState } from 'react';
import LeftPane from './components/LeftPane';
import RightPane from './components/RightPane';

function App() {
  const [isExamActive, setIsExamActive] = useState(false);
  const [isExamEnded, setIsExamEnded] = useState(false);

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
      <RightPane examActive={isExamActive} examEnded={isExamEnded} />
    </div>
  );
}

export default App;