import { Icon } from '@/components/Icon';
import { useAppStates } from '@/stores/appState/useState';
import * as Applications from './apps';
import './index.scss';
type AppsType = keyof typeof Applications;
export const Apps: React.FC<NonNullable<unknown>> = () => {
  const apps = [
    {
      appName: 'Blue',
      appIcon: 'win/user',
      clickAction: () => {
        console.log('blue');
      },
    },
    {
      appName: 'Browser',
      appIcon: 'edge',
      clickAction: () => {
        console.log('edge');
      },
    },
  ];
  const appState = useAppStates();
  return (
    <div className="desktop">
      <div className="apps">
        {apps.map(({ appName, appIcon, clickAction }) => {
          return (
            <div className="app-item" tabIndex={0} key={appName} onDoubleClick={clickAction}>
              <Icon invert={false} width={36} src={appIcon} />
              <div className="app-name">{appName}</div>
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
