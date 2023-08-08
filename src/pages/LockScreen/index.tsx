import { Battery } from '@/components/Battery';
import { Icon } from '@/components/Icon';
import { useSystemLockState, useUpdateLockState } from '@/stores/useState';
import { useEffect, useRef, useState } from 'react';
import { TopTimer } from './components/TopTimer';
import { UserLogin } from './components/UserLogin';
import './index.scss';
export const LockScreen: React.FC<NonNullable<unknown>> = props => {
  const [login, setLogin] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [lockBegin, setLockBegin] = useState(false);
  const systemLockState = useSystemLockState();
  const updateLockState = useUpdateLockState();

  const toggleLogin = () => {
    if (login == false) {
      setLogin(true);
      // 倒计时30秒后切换回来
      timeoutRef.current = setTimeout(() => {
        setLogin(false);
      }, 30000);
    }
  };

  const wrapper = useRef<HTMLDivElement>(null);
  const handler = (e: TransitionEvent) => {
    console.log(systemLockState, lockBegin);
    if (e.propertyName === 'opacity' && lockBegin === true) {
      console.log('hidden lockscreen');
      updateLockState(false);
    }
  };

  useEffect(() => {
    const screen = wrapper.current;
    screen?.addEventListener('transitionend', handler);
    return () => {
      clearInterval(timeoutRef.current!);
      screen?.removeEventListener('transitionend', handler);
    };
  });

  return (
    <div
      className="lockscreen z-10"
      style={{
        backgroundImage: `url(${`imgs/wallpaper/lock.jpg`})`,
      }}
      onClick={toggleLogin}
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
