import { useStore } from './createStore';
import { App } from './state';

export const useAppState = (appName: App) => useStore(state => state[appName]);
export const useUpdateState = () => useStore(state => state.toggleApp);
