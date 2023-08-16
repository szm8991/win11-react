type Props = {
  hidden: boolean;
};
export type App = 'edge' | 'explorer';
type AppState<T extends string> = {
  [K in T]: Props;
};
export type State = AppState<App>;
export const initialState: State = {
  edge: {
    hidden: true,
  },
  explorer: {
    hidden: true,
  },
};
