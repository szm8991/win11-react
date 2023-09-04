type Props = {
  hidden: boolean;
};
export type Apps = 'Edge' | 'Terminal';
type AppState<T extends string> = {
  [K in T]: Props;
};
export type State = AppState<Apps>;
export const initialState: State = {
  Edge: {
    hidden: true,
  },
  Terminal: {
    hidden: true,
  },
};
