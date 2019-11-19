export type CreateMutableState = <T>(initialValue: T) => MutableState<T>;

export interface MutableState<T> {
  onChange: (cb: Function) => void;
  get(): T;
  set(value: T): void;
}
