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
      toggleApp: app =>
        set(state => ({
          ...state,
          [app]: {
            ...state[app],
            hidden: !state[app].hidden,
          },
        })),
    }),
    {
      name: 'app-storage',
    }
  )
);
