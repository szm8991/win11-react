import { useEffect, useLayoutEffect, useRef } from 'react';
type timespanOption = {
  time: number;
  delta: number;
  delay: number;
};
export const useRAF = (callback: (opt: timespanOption) => void, delay: number) => {
  const callbackRef = useRef<(opt: timespanOption) => void>(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });

  const frameRef = useRef<number>();
  const init = useRef<number>(performance.now());
  const last = useRef<number>(performance.now());
  const tick = (now: number) => {
    if (now - last.current >= 1000) {
      callbackRef.current({
        // the absolute time _since the hook was first mounted_
        time: (now - init.current) / 1000,
        // the time _since the hook was run last_
        delta: (now - last.current) / 1000,
        // the condition of delay time
        delay: delay,
      });
      last.current = now;
    }
    frameRef.current = requestAnimationFrame(tick);
  };
  useLayoutEffect(() => {
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      // console.log('destory');
      frameRef.current && cancelAnimationFrame(frameRef.current);
    };
  });
};
