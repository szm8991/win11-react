import { useStore } from './createStore';

export const useSystemLockState = () => useStore(state => state.locked);

export const useUpdateLockState = () => useStore(state => state.updateLockState);
