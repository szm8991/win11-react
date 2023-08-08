import { useEffect, useRef } from 'react';
import { Desktop } from './pages/Desktop';
import { LockScreen } from './pages/LockScreen';
import { useSystemLockState, useUpdateLockState } from './stores/useState';
function App() {
  const systemLockState = useSystemLockState();
  const updateLockState = useUpdateLockState();
  const eventLock = useRef<boolean>(false);
  const hanlder = (e: KeyboardEvent) => {
    if (e.shiftKey && e.code == 'KeyL') {
      if (systemLockState === false) {
        updateLockState(true);
        eventLock.current = true;
      }
    }
  };
  useEffect(() => {
    document.addEventListener('keyup', hanlder);
    return () => {
      document.removeEventListener('keyup', hanlder);
    };
  });
  return (
    <div className="app">
      {systemLockState ? <LockScreen fadeIn={eventLock.current == true ? true : false} /> : null}
      <Desktop />
    </div>
  );
}

export default App;
