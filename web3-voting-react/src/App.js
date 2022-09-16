
import React, { useEffect } from 'react'
import { initWeb3 } from './Web3Client';


function App() {

  useEffect(() => {
    initWeb3();
  }, [])

  return (
    <div className="App">

    </div>
  );
}

export default App;
