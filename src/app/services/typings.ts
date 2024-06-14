export enum TimerState {
  ongoing = 'ongoing',
  paused = 'paused',
}

export enum TimerSortDirection {
  asc = 'asc',
  desc = 'desc',
}

export interface ITimer {
  timerId: string;
  state: TimerState;
  /** @description Initial timer duration (in seconds) */
  originalDuration: number;
  /** @description Current timer duration (in seconds) */
  currentDuration: number;
  createdAt?: string;
}
