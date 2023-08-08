import type { State } from './state';
export type Action = {
  updateLockState: (locked: State['locked']) => void;
};
