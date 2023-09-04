import type { Apps } from './state';
export type Action = {
  toggleApp: (appName: Apps) => void;
};
