import type { Apps } from './state';
export type Action = {
  toggleAppOpen: (appName: Apps) => void;
  toggleAppActive: (appName: Apps) => void;
  toggleAppSize: (appName: Apps) => void;
};
