import { useState } from 'react';
import LeftPane from './components/LeftPane';
import RightPane from './components/RightPane';

function App() {
  const [isExamActive, setIsExamActive] = useState(false);

  const handleExamStatusChange = (status: boolean) => {
    setIsExamActive(status);
  };
  
  // Render the LeftPane and RightPane components
  return (
    <div className="App">
      <LeftPane onExamStatusChange={handleExamStatusChange} />
      <RightPane examActive={isExamActive}/>
    </div>
  );
}

export default App;
