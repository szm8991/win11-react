import { create } from 'zustand';
import type { Action } from './action';
import type { State } from './state';
import { initialState } from './state';
export type Store = State & Action;
export const useStore = create<Store>()(set => ({
  ...initialState,
  toggleAppOpen: app =>
    set(state => ({
      [app]: {
        ...state[app],
        open: !state[app].open,
        active: !state[app].active,
        hidden: !state[app].hidden,
        zIndex: state[app].open ? 0 : state.Common.zIndex,
      },
      Common: {
        ...state['Common'],
        zIndex: state.Common.zIndex + 1,
        preTop: state.Common.curTop,
        curTop: app,
      },
    })),
  toggleAppActive: app =>
    set(state => {
      const onTop = state.Common.curTop === app;
      const isActive = state[app].active;
      const tmpTop = state.Common.preTop;
      return onTop
        ? {
            [app]: {
              ...state[app],
              active: !state[app].active,
              open: true,
              hidden: !state[app].hidden,
            },
            Common: {
              ...state['Common'],
              preTop: state.Common.curTop,
              curTop: isActive ? tmpTop : app,
            },
          }
        : {
            [app]: {
              ...state[app],
              active: true,
              open: true,
              hidden: false,
              zIndex: state.Common.zIndex,
            },
            Common: {
              ...state['Common'],
              zIndex: state.Common.zIndex + 1,
              preTop: state.Common.curTop,
              curTop: app,
            },
          };
    }),
  toggleAppSize: app =>
    set(state => ({
      [app]: {
        ...state[app],
        size: state[app].size === 'full' ? 'mini' : 'full',
      },
    })),
}));
