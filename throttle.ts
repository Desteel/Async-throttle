import Watcher from "./watcher";

const throttle = <T extends [], D>(
  callback: (..._: T) => Promise<D | undefined>
): ((..._: T) => Promise<D | undefined>) => {
  let isRunning: boolean = false;
  let lastTime: number;

  const watcher = new Watcher<D | undefined>();

  const next = async (...args: T) => {
    let value: D | undefined;
    const currentTime = new Date().getTime();

    lastTime = currentTime;

    if (isRunning) {
      value = await new Promise<D>(watcher.addListener);
    }

    if (lastTime === currentTime) {
      isRunning = true;

      try {
        const response = await callback(...args);
        watcher.dispatch(response);

        return response;
      } finally {
        isRunning = false;
        watcher.removeListeners();
      }
    } else {
      return value;
    }
  };

  return (...args: T) => next(...args);
};

export default throttle;

// const func = async() => {}
// const throttled = throttle(func);
// throttled();
