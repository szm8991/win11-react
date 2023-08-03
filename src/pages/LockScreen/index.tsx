import { Battery } from '@/components/Battery';
import { Icon } from '@/components/Icon';
import { useEffect, useRef, useState } from 'react';
import { TopTimer } from './components/TopTimer';
import { UserLogin } from './components/UserLogin';
import './index.scss';
export const LockScreen: React.FC<{
  setLock: React.Dispatch<React.SetStateAction<boolean>>;
}> = props => {
  const [login, setLogin] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [locked, setLock] = useState(true);

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
    if (e.propertyName === 'opacity' && locked === false) {
      console.log('hidden lockscreen');
      props.setLock(false);
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
      data-unlock={!locked}
      ref={wrapper}
    >
      <TopTimer login={login} />
      <UserLogin login={login} setLock={setLock} />
      <div className="absolute right-6 bottom-6 z-10 flex">
        <Icon src="wifi" width={16} invert />
        <Battery invert className="mx-1" />
      </div>
      {/* <div className="absolute right-6 bottom-6 z-10 flex">电量:{battery.current?.level}</div> */}
    </div>
  );
};
