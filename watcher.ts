class Watcher<T> {
  public listeners: Array<(value?: T) => void> = [];

  public addListener = (listener: (value?: T) => void) => {
    this.listeners.push(listener);
    return this;
  };

  public removeListeners = () => {
    this.listeners = [];

    return this;
  };

  public removeListener = (listener: (value?: T) => void) => {
    this.listeners = this.listeners.filter(item => item !== listener);
    return this;
  };

  public dispatch = (value: T) => {
    this.listeners.forEach(listener => listener(value));
    return this;
  };
}

export default Watcher;
