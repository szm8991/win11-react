import { Icon } from '@/components/Icon';
import { type Apps as AppType } from '@/stores/appState/state';
import { useAppStates, useUpdateActive } from '@/stores/appState/useState';
import { MouseEventHandler } from 'react';
import * as Applications from './apps';
import './index.scss';
type AppsType = keyof typeof Applications;
const desktopApps = [
  {
    app: 'System',
    src: 'win/user',
  },
  {
    app: 'Edge',
    src: 'edge',
  },
  {
    app: 'Terminal',
    src: 'terminal',
  },
];
export const Apps: React.FC<NonNullable<unknown>> = () => {
  const updater = useUpdateActive();
  const appStates = useAppStates();
  const handler: MouseEventHandler<HTMLDivElement> = e => {
    if (!(e.currentTarget instanceof HTMLDivElement)) {
      return;
    }
    updater((e.currentTarget.children[0] as HTMLDivElement).dataset.action as AppType);
  };
  return (
    <div className="desktop">
      <div className="app-list">
        {desktopApps.map(({ app, src }) => {
          return (
            <div className="app-item" tabIndex={0} key={app} onDoubleClick={handler}>
              <Icon invert={false} width={36} src={src} action={app} />
              <div className="app-name">{app}</div>
            </div>
          );
        })}
      </div>
      {Object.keys(Applications).map((key, idx) => {
        const WinApp = Applications[key as AppsType];
        return appStates[key as AppsType].open ? <WinApp key={idx} /> : null;
      })}
    </div>
  );
};
