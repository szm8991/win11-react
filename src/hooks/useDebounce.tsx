function debounce(fn: (...args: unknown[]) => unknown, ms: number) {
  let timer: number | null;
  return function (...args: unknown[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      fn(...args);
      timer = null;
    }, ms);
  };
}

export function useDebounce(fn: (...args: unknown[]) => unknown, time: number) {
  return debounce(fn, time);
}
