import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Action } from './action';
import type { State } from './state';
import { initialState } from './state';
export type Store = State & Action;
export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      ...initialState,
      updateLockState: isLock =>
        set({
          locked: isLock,
        }),
    }),
    {
      name: 'app-storage',
    }
  )
);
