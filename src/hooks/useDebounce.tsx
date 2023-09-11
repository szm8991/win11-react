function debounce(fn: (...args: unknown[]) => unknown, delay: number, immediate = false) {
  let timer: number | null;
  let lastArgs: unknown = null;
  return function (this: unknown, ...args: unknown[]) {
    if (!timer && immediate) {
      fn.apply(this, args);
      immediate = false;
      return;
    } else lastArgs = args;
    timer && clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn.apply(this, args);
      lastArgs = null;
      timer = null;
    }, delay);
  };
}

export function useDebounce(fn: (...args: any[]) => unknown, time: number) {
  return debounce(fn, time);
}
