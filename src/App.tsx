import { useState } from 'react';
import { Desktop } from './components/Desktop';
import { LockScreen } from './pages/LockScreen';
function App() {
  const [lock, setLock] = useState(true);
  return <div className="app">{lock ? <LockScreen /> : <Desktop />}</div>;
}

export default App;
