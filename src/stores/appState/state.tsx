type Props = {
  hidden: boolean;
  open: boolean;
  active: boolean;
};
export type Apps = 'Edge' | 'Terminal';
type AppState<T extends string> = {
  [K in T]: Props;
};
export type State = AppState<Apps>;
export const initialState: State = {
  Edge: {
    hidden: true,
    open: false,
    active: false,
  },
  Terminal: {
    hidden: true,
    open: false,
    active: false,
  },
};
