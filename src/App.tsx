import { StrictMode, useEffect, useRef } from 'react';
import { Desktop } from './pages/Desktop';
import { LockScreen } from './pages/LockScreen';
import { useSystemLockState, useUpdateLockState } from './stores/lockState/useState';
function App() {
  const systemLockState = useSystemLockState();
  const updateLockState = useUpdateLockState();
  const eventLock = useRef<boolean>(false);
  const handler = (e: KeyboardEvent) => {
    if (e.shiftKey && e.code == 'KeyL') {
      if (systemLockState === false) {
        updateLockState(true);
        eventLock.current = true;
      }
    }
  };
  useEffect(() => {
    document.addEventListener('keyup', handler);
    return () => {
      document.removeEventListener('keyup', handler);
    };
  });
  return (
    <StrictMode>
      <div className="app">
        {systemLockState ? <LockScreen fadeIn={eventLock.current == true ? true : false} /> : null}
        <Desktop />
      </div>
    </StrictMode>
  );
}

export default App;
