import { TimeMachine } from './createTimeMachine.types';
import { MutableState } from './useMutableState.types';

export const createTimeMachine = <T>(
  mutableState: MutableState<T>, stateHistory: T[],
): TimeMachine => {
  let pointer = stateHistory.length - 1;
  let newPointer;

  return {
    travel: (direction: 'forward' | 'backward', steps: number = 1) => {
      switch (direction) {
        case 'backward':
          newPointer = pointer - steps;
          if (newPointer < 0) return;
          pointer = newPointer;
          break;

        case 'forward':
          newPointer = pointer + steps;
          if (newPointer >= stateHistory.length) return;
          pointer = newPointer;
          break;

        default: return;
      }

      mutableState.set(stateHistory[pointer]);
    },
  };
};
