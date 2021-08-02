import { CallbackFunction, MutableState } from './useMutableState.types';

export const useMutableState = <T>(initialValue?: T | undefined): MutableState<T> => {
  let value: T | undefined = initialValue;
  let callbackFunction: CallbackFunction<T> = () => {};

  return {
    get: (): T | undefined => value,
    set: (newValue: T): void => {
      value = newValue;
      callbackFunction(value);
    },
    onChange: (newCallbackFunction: CallbackFunction<T>): void => {
      callbackFunction = newCallbackFunction;
    },
  };
};
