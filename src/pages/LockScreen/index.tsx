import { useEffect, useRef, useState } from 'react';
import { TopTimer } from './components/TopTimer';
import { UserLogin } from './components/UserLogin';

export const LockScreen = () => {
  const [login, setLogin] = useState(false);
  const timeoutRef = useRef(0);

  const toggleLogin = () => {
    if (login == false) {
      setLogin(true);
      // 倒计时5秒后切换回来
      timeoutRef.current = setTimeout(() => {
        setLogin(false);
      }, 5000);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 min-h-screen min-w-sreen bg-cover bg-no-repeat bg-center flex flex-col items-center z-10 transition-all"
      style={{
        backgroundImage: `url(${`imgs/wallpaper/lock.jpg`})`,
      }}
      onClick={toggleLogin}
    >
      <TopTimer login={login} />
      <UserLogin login={login} />
    </div>
  );
};
