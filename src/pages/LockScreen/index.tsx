import { useEffect, useRef, useState } from 'react';
import { Battery } from './components/Battery';
import { Icon } from './components/Icon';
import { TopTimer } from './components/TopTimer';
import { UserLogin } from './components/UserLogin';
import './index.scss';
export const LockScreen = () => {
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

  useEffect(() => {
    return () => {
      clearInterval(timeoutRef.current!);
    };
  }, []);

  return (
    <div
      className="lockscreen"
      style={{
        backgroundImage: `url(${`imgs/wallpaper/lock.jpg`})`,
      }}
      onClick={toggleLogin}
      data-blur={login}
      data-unlock={!locked}
    >
      <TopTimer login={login} />
      <UserLogin login={login} setLock={setLock} />
      <div className="absolute right-6 bottom-6 z-10 flex">
        <Icon src="wifi" width={16} invert />
        <Battery invert />
      </div>
      {/* <div className="absolute right-6 bottom-6 z-10 flex">电量:{battery.current?.level}</div> */}
    </div>
  );
};
