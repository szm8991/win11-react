import { Battery } from '@/components/Battery';
import { Icon } from '@/components/Icon';
import { useState } from 'react';
import './index.scss';
export const Taskbar = () => {
  const [time, setTime] = useState(new Date());
  return (
    <div className="taskbar min-w-full h-12 absolute bottom-0 flex justify-between items-center px-3">
      <div>
        <Icon width={24} src="widget" invert={false} />
      </div>
      <div className="flex gap-2">
        <Icon width={24} src="home" invert={false} />
        {/* <Icon icon="taskSearch" invert={false} /> */}
        <Icon width={24} src="search" invert />
        <Icon width={24} src="settings" invert={false} />
        <Icon width={24} src="explorer" invert={false} />
        <Icon width={24} src="edge" invert={false} />
        <Icon width={24} src="store" invert={false} />
        <Icon width={24} src="terminal" invert={false} />
      </div>
      <div className="flex flex-row">
        <Icon icon="upArrow" invert={false} />
        <Icon width={16} src="audio3" invert />
        <Icon width={16} src="wifi" invert />
        <div className="mx-2 relative grid place-items-center">
          <Battery invert />
        </div>
        <div className="task-date">
          <div>
            {time.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
            })}
          </div>
          <div>
            {time.toLocaleDateString('en-US', {
              year: '2-digit',
              month: '2-digit',
              day: 'numeric',
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
