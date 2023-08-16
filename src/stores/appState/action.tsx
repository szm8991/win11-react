import type { App } from './state';
export type Action = {
  toggleApp: (appName: App) => void;
};
