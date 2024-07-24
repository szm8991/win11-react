type Props = {
  hidden: boolean;
  open: boolean;
  active: boolean;
  size: 'full' | 'mini';
  zIndex: number;
};
export type Apps = 'Edge' | 'Terminal';
type AppState<T extends string> = {
  [K in T]: Props;
};
export type State = AppState<Apps> & {
  Common: {
    zIndex: number;
    preTop: Apps | null;
    curTop: Apps | null;
  };
};
export const initialState: State = {
  Common: {
    zIndex: 1,
    preTop: null,
    curTop: null,
  },
  Edge: {
    hidden: true,
    open: false,
    active: false,
    size: 'mini',
    zIndex: 0,
  },
  Terminal: {
    hidden: true,
    open: false,
    active: false,
    size: 'mini',
    zIndex: 0,
  },
};
