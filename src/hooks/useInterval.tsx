import { useEffect, useLayoutEffect, useRef } from 'react';

export const useInterval = (callback: () => void, delay: number) => {
  const saveCallback = useRef<() => void>();

  useEffect(() => {
    saveCallback.current = callback;
  });

  useLayoutEffect(() => {
    function tick() {
      saveCallback.current!();
    }
    // delay变为null的的时候，会先清除掉之前的定时器
    // 然后也不会起新的定时器，整个useInterval结束
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
