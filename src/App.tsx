import { useState } from 'react';
import { Desktop } from './pages/Desktop';
import { LockScreen } from './pages/LockScreen';
function App() {
  const [lock, setLock] = useState(true);
  return (
    <div className="app">
      {lock ? <LockScreen setLock={setLock} /> : null}
      <Desktop />
    </div>
  );
}

export default App;
