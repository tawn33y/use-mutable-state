import { useMutableState } from './useMutableState';

describe('useMutableState', () => {
  const ageMutable = useMutableState<number>();

  it('get() returns the value correctly', () => {
    expect(ageMutable.get()).toBe(undefined);
  });

  it('set() updates the value correctly', () => {
    for (let i = 0; i < 10; i += 1) {
      ageMutable.set(i);
      expect(ageMutable.get()).toBe(i);
    }
  });

  it('onChange() is called whenever the value is updated', () => {
    let i = 0;

    ageMutable.onChange((val) => {
      expect(val).toBe(i);
      expect(ageMutable.get()).toBe(i);
    });

    for (i; i < 10; i += 1) {
      ageMutable.set(i);
    }
  });
});
