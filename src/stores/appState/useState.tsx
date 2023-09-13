import { useStore } from './createStore';
import { Apps } from './state';

export const useAppState = (appName: Apps) => useStore(state => state[appName]);
export const useAppStates = () => useStore(state => state);
export const useUpdateOpen = () => useStore(state => state.toggleAppOpen);
export const useUpdateActive = () => useStore(state => state.toggleAppActive);
export const useUpdateSize = () => useStore(state => state.toggleAppSize);
