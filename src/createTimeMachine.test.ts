import { useMutableState } from './useMutableState';
import { createTimeMachine } from './createTimeMachine';
import { TimeMachine } from './createTimeMachine.types';

describe('time machine', () => {
  const ageMutable = useMutableState<number>();
  let ageHistory: number[] = [];
  let timeMachine: TimeMachine;

  beforeAll(() => {
    ageMutable.onChange(() => {
      ageHistory = [...ageHistory, ageMutable.get() as number];
    });

    ageMutable.set(1);
    ageMutable.set(2);
    ageMutable.set(3);
    ageMutable.set(4);
    ageMutable.set(5);
    ageMutable.set(6);

    timeMachine = createTimeMachine(ageMutable, ageHistory);
  });

  it('goes backward 1 step', () => {
    timeMachine.travel('backward');
    expect(ageMutable.get()).toBe(5);
  });

  it('goes backward 4 steps', () => {
    timeMachine.travel('backward', 4);
    expect(ageMutable.get()).toBe(1);
  });

  it('goes forward 1 step', () => {
    timeMachine.travel('forward');
    expect(ageMutable.get()).toBe(2);
  });

  it('goes forward 3 steps', () => {
    timeMachine.travel('forward', 3);
    expect(ageMutable.get()).toBe(5);
  });
});
