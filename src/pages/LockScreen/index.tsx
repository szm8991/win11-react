import { Battery } from '@/components/Battery';
import { Icon } from '@/components/Icon';
import { useUpdateLockState } from '@/stores/lockState/useState';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { TopTimer } from './components/TopTimer';
import { UserLogin } from './components/UserLogin';
import './index.scss';
export const LockScreen: React.FC<{ fadeIn?: boolean }> = props => {
  const [login, setLogin] = useState(false);
  const [lockBegin, setLockBegin] = useState(false);
  const updateLockState = useUpdateLockState();

  const toggleLogin: MouseEventHandler<HTMLDivElement> = e => {
    setLogin(!login);
  };

  const wrapper = useRef<HTMLDivElement>(null);
  const handler = (e: TransitionEvent) => {
    if (e.propertyName === 'opacity' && lockBegin === true) {
      console.log('hidden lockscreen');
      updateLockState(false);
    }
  };

  useEffect(() => {
    const screen = wrapper.current;
    screen?.addEventListener('transitionend', handler);

    return () => {
      screen?.removeEventListener('transitionend', handler);
    };
  });

  return (
    <div
      className="lockscreen z-10"
      onClick={toggleLogin}
      data-fadein={props.fadeIn ?? false}
      data-blur={login}
      data-unlock={lockBegin}
      ref={wrapper}
    >
      <TopTimer login={login} />
      <UserLogin login={login} setLockBegin={setLockBegin} />
      <div className="absolute right-6 bottom-6 z-10 flex">
        <Icon src="wifi" width={16} invert />
        <Battery invert className="mx-1" />
      </div>
      {/* <div className="absolute right-6 bottom-6 z-10 flex">电量:{battery.current?.level}</div> */}
    </div>
  );
};
