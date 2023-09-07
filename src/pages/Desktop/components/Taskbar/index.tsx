import { Battery } from '@/components/Battery';
import { Icon } from '@/components/Icon';
import { useRAF } from '@/hooks/useRAF';
import { type Apps } from '@/stores/appState/state';
import { useAppStates, useUpdateActive } from '@/stores/appState/useState';
import { MouseEventHandler, useState } from 'react';
import './index.scss';
const taskbarApps = [
  {
    src: 'home',
    invert: false,
  },
  {
    src: 'search',
    invert: true,
  },
  {
    src: 'settings',
    invert: false,
  },
  {
    src: 'explorer',
    invert: false,
  },
  {
    app: 'Edge',
    src: 'edge',
    invert: false,
  },
  {
    src: 'store',
    invert: false,
  },
  {
    app: 'Terminal',
    src: 'terminal',
    invert: false,
  },
];
export const Taskbar = () => {
  const [time, setTime] = useState(new Date());
  const updater = useUpdateActive();
  const appState = useAppStates();

  // useInterval(() => {
  //   setTime(new Date());
  // }, 1000);
  useRAF(options => {
    setTime(new Date());
  }, 1000);
  const handler: MouseEventHandler<HTMLDivElement> = e => {
    if (!(e.currentTarget instanceof HTMLDivElement)) {
      return;
    }
    updater(e.currentTarget.dataset.action! as Apps);
  };
  return (
    <>
      <div className="taskbar min-w-full h-12 absolute bottom-0 flex justify-between items-center px-3">
        <div className="center absolute bottom-0 min-w-full flex h-12 justify-center">
          <Icon
            width={24}
            src="widget"
            invert={false}
            className="task-icon active-transition icon-1"
          />
          {taskbarApps.map(({ app, src, invert }, index) => {
            return (
              <Icon
                key={index}
                width={24}
                src={src}
                invert={invert}
                className="task-icon active-transition"
                action={app}
                open={appState[app as Apps]?.open}
                active={appState[app as Apps]?.active}
                onClick={handler}
              />
            );
          })}
        </div>
        <div className="right absolute right-0 flex flex-row">
          <Icon icon="upArrow" invert={false} className="px-1 active-transition" />
          <div className="flex flex-row px-1 active-transition">
            <Icon width={16} src="audio3" invert />
            <Icon width={16} src="wifi" invert />
            <div className="mx-1 relative grid place-items-center">
              <Battery invert />
            </div>
          </div>
          <div className="task-date px-2 active-transition">
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
