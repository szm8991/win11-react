import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Action } from './action';
import type { State } from './state';
import { initialState } from './state';
export type Store = State & Action;
export const useStore = create<Store>()(
  persist(
    set => ({
      ...initialState,
      updateLockState: isLock =>
        set(state => ({
          ...state,
          locked: isLock,
        })),
    }),
    {
      name: 'lock-storage',
    }
  )
);
