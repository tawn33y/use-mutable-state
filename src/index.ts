import { CreateMutableState } from './interface';

// eslint-disable-next-line import/prefer-default-export
export const createMutableState: CreateMutableState = (initialValue = null) => {
  let value = initialValue;
  let $cb: Function = () => {};

  return {
    onChange: (cb) => {
      $cb = cb;
    },
    get: () => value,
    set: (newValue) => {
      value = newValue;
      $cb(value);
    },
  };
};
