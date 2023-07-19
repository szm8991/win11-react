import { useState } from 'react';

export const LockScreen = () => {
  const [login, setLogin] = useState(false);
  const toggleLogin = () => {
    setLogin(!login);
  };
  return (
    <div
      className="absolute inset-0 bg-cover bg-no-repeat bg-center flex flex-col items-center z-10"
      style={{
        backgroundImage: `url(${`imgs/wallpaper/lock.jpg`})`,
      }}
      onClick={toggleLogin}
    >
      <TopTimer login={login} />
      <UserInfo login={login} />
    </div>
  );
};

const TopTimer: React.FC<{ login: boolean }> = props => {
  return (
    <>
      <div
        className="mt-40 flex items-center flex-col transition-all data-[login=true]:opacity-0 data-[login=true]:pointer-events-none data-[login=true]:-translate-y-48"
        data-login={props.login}
      >
        <div className="text-6xl font-semibold text-gray-100">
          {new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </div>
        <div className="text-lg font-medium text-gray-200">
          {new Date().toLocaleDateString(undefined, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>
    </>
  );
};

const UserInfo: React.FC<{ login: boolean }> = props => {
  return (
    <div
      className="absolute top-1/4 flex flex-col items-center opacity-0 translate-y-16 pointer-events-none transition-all data-[login=false]:opacity-100 data-[login=false]:pointer-events-auto data-[login=false]:translate-y-0"
      data-login={!props.login}
    >
      <img className="rounded-full overflow-hidden w-52" src="imgs/asset/user.jpg" />
      <div className="mt-2 text-2xl font-medium text-gray-200">{'userName'}</div>
      <div className="flex items-center mt-6 signInBtn">Sign in</div>
    </div>
  );
};
