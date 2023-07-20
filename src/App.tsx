import { useState } from 'react';
import { Desktop } from './components/Desktop';
import './index.css';
import { LockScreen } from './pages/LockScreen';
function App() {
  const [lock, setLock] = useState(true);
  return <>{lock ? <LockScreen /> : <Desktop />}</>;
}

export default App;
