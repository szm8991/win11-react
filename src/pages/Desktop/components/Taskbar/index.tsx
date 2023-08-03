import { Battery } from '@/components/Battery';
import { Icon } from '@/components/Icon';
import { useInterval } from '@/hooks/useInterval';
import { MouseEventHandler, useState } from 'react';
import './index.scss';
export const Taskbar = () => {
  const [time, setTime] = useState(new Date());
  useInterval(() => {
    setTime(new Date());
  }, 1000);
  const handler: MouseEventHandler<HTMLDivElement> = e => {
    if (!(e.currentTarget instanceof HTMLDivElement)) {
      return;
    }
    e.currentTarget.dataset.open = 'true';
    // e.target.dataset.active = true;
  };
  return (
    <>
      <div className="taskbar min-w-full h-12 absolute bottom-0 flex justify-between items-center px-3">
        <div className="center absolute bottom-0 min-w-full flex h-12 justify-center">
          <Icon width={24} src="widget" invert={false} className="task-icon icon-1" />
          <Icon width={24} src="home" invert={false} className="task-icon" onClick={handler} />
          <Icon width={24} src="search" invert className="task-icon" />
          <Icon width={24} src="settings" invert={false} className="task-icon" />
          <Icon width={24} src="explorer" invert={false} className="task-icon" />
          <Icon width={24} src="edge" invert={false} className="task-icon" />
          <Icon width={24} src="store" invert={false} className="task-icon" />
          <Icon width={24} src="terminal" invert={false} className="task-icon" />
        </div>
        <div className="right absolute right-0 flex flex-row">
          <Icon icon="upArrow" invert={false} />
          <Icon width={16} src="audio3" invert />
          <Icon width={16} src="wifi" invert />
          <div className="mx-1 relative grid place-items-center">
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
    </>
  );
};
