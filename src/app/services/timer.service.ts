import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ITimer, TimerSortDirection, TimerState } from './typings';
import { StateService } from './state.service';
import { tap } from 'rxjs';

export interface TimerServiceState {
  timers: ITimer[] | null;
  sortDirection: TimerSortDirection;
}

const initialTimerState: TimerServiceState = {
  timers: null,
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

  removeTimer(timerId: string) {
    this.setState({
      timers: this.state.timers?.filter((timer) => timer.timerId !== timerId),
    });
  }

  setTimerState(newTimer: Partial<ITimer>) {
    // Assign the timer object in the array to newTimer.
    const newTimers = this.state.timers?.map((oldTimer) =>
      oldTimer.timerId === newTimer.timerId
        ? { ...oldTimer, ...newTimer }
        : oldTimer
    );

    this.setState({
      timers: newTimers,
    });
  }

  setTimerSortDirection(sortDirection: TimerSortDirection) {
    // Sort Timer by the createdAt date
    const timers = this.state.timers?.sort((a, b) => {
      const date1 = new Date(a.createdAt);
      const date2 = new Date(b.createdAt);

      return sortDirection === TimerSortDirection.asc
        ? date1.getTime() - date2.getTime()
        : date2.getTime() - date1.getTime();
    });

    this.setState({ sortDirection, timers });
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
        // Add the new timer to the timers arr
        const oldTimers = this.state.timers ?? [];
        const newTimers =
          this.state.sortDirection === TimerSortDirection.asc
            ? [...oldTimers, res.data]
            : [res.data, ...oldTimers];
  
        this.setState({ timers: newTimers });
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

  deleteTimer(timerId: string) {
    return this.api.deleteTimer(timerId).pipe(
      tap((_) => {
        this.setState({
          timers: this.state.timers?.filter(
            (timer) => timer.timerId !== timerId
          ),
        });
      })
    );
  }
}
