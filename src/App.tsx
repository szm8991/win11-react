import { Desktop } from './pages/Desktop';
import { LockScreen } from './pages/LockScreen';
import { useSystemLockState } from './stores/useState';
function App() {
  const systemLockState = useSystemLockState();
  return (
    <div className="app">
      {systemLockState ? <LockScreen /> : null}
      <Desktop />
    </div>
  );
}

export default App;
