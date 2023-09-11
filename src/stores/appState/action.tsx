import type { Apps } from './state';
export type Action = {
  toggleAppHidden: (appName: Apps) => void;
  toggleAppOpen: (appName: Apps) => void;
  toggleAppActive: (appName: Apps) => void;
  toggleAppSize: (appName: Apps) => void;
};
