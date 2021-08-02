export interface TimeMachine {
  travel: (direction: 'forward' | 'backward', steps?: number) => void;
}
