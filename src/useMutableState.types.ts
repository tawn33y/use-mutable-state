export type CallbackFunction<T> = (value?: T) => any;

export interface MutableState<T> {
  get: () => T | undefined;
  set: (newValue: T) => void;
  onChange: (newCallbackFunction: CallbackFunction<T>) => void;
}
