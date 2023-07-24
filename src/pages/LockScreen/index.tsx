import { useBatteryStatus } from '@/hooks/useBatteryStatus';
import { useEffect, useRef, useState } from 'react';
import { TopTimer } from './components/TopTimer';
import { UserLogin } from './components/UserLogin';
import './index.scss';
export const LockScreen = () => {
  const [login, setLogin] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const battery = useBatteryStatus();

  const toggleLogin = () => {
    if (login == false) {
      setLogin(true);
      // 倒计时5秒后切换回来
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
    >
      <TopTimer login={login} />
      <UserLogin login={login} />
      <div className="absolute right-6 bottom-6 z-10 flex">电池:{battery.current?.level}</div>;
    </div>
  );
};
