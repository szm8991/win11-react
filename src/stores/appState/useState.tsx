import { useStore } from './createStore';
import { Apps } from './state';

export const useAppState = (appName: Apps) => useStore(state => state[appName]);
export const useAppStates = () => useStore(state => state);
export const useUpdateState = () => useStore(state => state.toggleApp);
