import React from 'react';
import LeftPane from './components/LeftPane';
import RightPane from './components/RightPane';

function App() {

  // Render the LeftPane and RightPane components
  return (
    <div className="App">
      <LeftPane />
      <RightPane/>
    </div>
  );
}

export default App;
