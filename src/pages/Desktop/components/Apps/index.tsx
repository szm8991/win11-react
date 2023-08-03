import { Icon } from '@/components/Icon';
import './index.scss';

export const Apps: React.FC<NonNullable<unknown>> = () => {
  return (
    <div className="desktop">
      <div className="apps">
        <div className="app-item" tabIndex={0}>
          <Icon invert={false} width={36} src={'win/' + 'user'} />
          <div className="app-name">Blue</div>
        </div>
        <div className="app-item" tabIndex={0}>
          <Icon invert={false} width={36} src={'win/' + 'user'} />
          <div className="app-name">Blue</div>
        </div>
        <div className="app-item" tabIndex={0}>
          <Icon invert={false} width={36} src={'win/' + 'user'} />
          <div className="app-name">Blue</div>
        </div>
      </div>
    </div>
  );
};
