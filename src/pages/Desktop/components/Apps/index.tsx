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
  const appState = useAppStates();
  const updater = useUpdateActive();
  const handler: MouseEventHandler<HTMLDivElement> = e => {
    if (!(e.currentTarget instanceof HTMLDivElement)) {
      return;
    }
    updater((e.currentTarget.children[0] as HTMLDivElement).dataset.action as AppType);
  };
  return (
    <div className="desktop">
      <div className="apps">
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
        return (
          <WinApp hidden={appState[key as AppsType].hidden} size="full" key={idx} zIndex={1} />
        );
      })}
    </div>
  );
};
