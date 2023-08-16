import { Icon } from '@/components/Icon';
import { useAppState } from '@/stores/appState/useState';
import { Edge } from './Edge';
import './index.scss';
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
  const { hidden } = useAppState('edge');
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
      <Edge hidden={hidden} size="full" zIndex={1} />
    </div>
  );
};
