export function debounce<T>(func: (args: T) => void, timeout = 300) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: [args: T]) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
