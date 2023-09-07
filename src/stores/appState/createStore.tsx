import { create } from 'zustand';
import type { Action } from './action';
import type { State } from './state';
import { initialState } from './state';
export type Store = State & Action;
export const useStore = create<Store>()(set => ({
  ...initialState,
  toggleAppHidden: app =>
    set(state => ({
      [app]: {
        ...state[app],
        hidden: !state[app].hidden,
      },
    })),
  toggleAppOpen: app =>
    set(state => ({
      [app]: {
        ...state[app],
        open: !state[app].open,
      },
    })),
  toggleAppActive: app =>
    set(state => ({
      [app]: {
        ...state[app],
        active: !state[app].active,
        open: true,
        hidden: !state[app].hidden,
      },
    })),
}));
