import { useRAF } from '@/hooks/useRAF';
import { useState } from 'react';

export const TopTimer: React.FC<{ login: boolean }> = props => {
  const [time, setTime] = useState(new Date());
  useRAF(options => {
    setTime(new Date());
  }, 1000);
  return (
    <>
      <div
        className="mt-40 flex items-center flex-col transition-all data-[login=true]:opacity-0 data-[login=true]:pointer-events-none data-[login=true]:-translate-y-48"
        data-login={props.login}
      >
        <div className="text-6xl font-semibold text-gray-100">
          {time.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </div>
        <div className="text-lg font-medium text-gray-200">
          {time.toLocaleDateString(undefined, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>
    </>
  );
};
