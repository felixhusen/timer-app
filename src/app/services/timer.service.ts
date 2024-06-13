import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ITimer, TimerSortDirection, TimerState } from './typings';
import { StateService } from './state.service';
import { tap, timer } from 'rxjs';

export interface TimerServiceState {
  timers: ITimer[];
  sortDirection: TimerSortDirection;
}

const initialTimerState: TimerServiceState = {
  timers: [],
  sortDirection: TimerSortDirection.asc,
};

@Injectable({
  providedIn: 'root',
})
export class TimerService extends StateService<TimerServiceState> {
  readonly timers$ = this.select((state) => state.timers);
  readonly timerSortDirection$ = this.select((state) => state.sortDirection);
  constructor(private api: ApiService) {
    super(initialTimerState);
  }

  setTimerState(newTimer: Partial<ITimer>) {
    // Assign the timer object in the array to newTimer.
    const newTimers = this.state.timers.map((oldTimer) =>
      oldTimer.timerId === newTimer.timerId
        ? { ...oldTimer, ...newTimer }
        : oldTimer
    );

    this.setState({
      timers: newTimers,
    });
  }

  getTimers() {
    return this.api.getTimers().pipe(
      tap((res) => {
        this.setState({ timers: res.data.timerDetails });
      })
    );
  }

  addTimer(duration: number) {
    return this.api.addTimer(duration).pipe(
      tap((res) => {
        this.setState({ timers: [...this.state.timers, res.data] });
      })
    );
  }

  pauseTimer(timerId: string) {
    return this.api.pauseTimer(timerId).pipe(
      tap((res) => {
        this.setTimerState({
          timerId: res.data.timerId,
          state: TimerState.paused,
        });
      })
    );
  }

  startTimer(timerId: string) {
    return this.api.startTimer(timerId).pipe(
      tap((res) => {
        this.setTimerState({
          timerId: res.data.timerId,
          state: TimerState.ongoing,
        });
      })
    );
  }
}
