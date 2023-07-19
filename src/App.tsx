import { useState } from 'react';
import { Desktop } from './components/Desktop';
import { LockScreen } from './components/LockScreen';
import './index.css';
function App() {
  const [lock, setLock] = useState(true);
  return <>{lock ? <LockScreen /> : <Desktop />}</>;
}

export default App;
