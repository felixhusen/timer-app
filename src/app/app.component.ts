import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimerListComponent } from './components/timer-list/timer-list.component';
import { WebsocketService } from './services/websocket.service';
import { Subject, takeUntil } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { TimerService } from './services/timer.service';
import { CommonModule } from '@angular/common';
import { TimerSortDirection } from './services/typings';
import { getRandomTimerDuration } from './utils/timer-util';
import { environment } from '../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TimerListComponent, CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  readonly timers$ = this.timerService.timers$;
  readonly timerSortDirection$ = this.timerService.timerSortDirection$;

  TimerSortDirection = TimerSortDirection;

  constructor(
    private wsService: WebsocketService,
    private logger: NGXLogger,
    private timerService: TimerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.initWebsocket();
    this.loadData();
  }

  initWebsocket() {
    this.wsService
      .timerEvent()
      .pipe(takeUntil(this.destroy$))
      .subscribe((eventData) => {
        this.logger.info('[AppComponent] timerEvent: ', eventData);
        this.timerService.setTimerState(eventData);
      });
  }

  loadData() {
    this.timerService
      .getTimers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({ error: (err) => this.handleError(err) });
  }

  onAddTimerClick() {
    // Generate a random duration between specified `start` and `end` duration
    const timerDuration = getRandomTimerDuration(
      environment.minTimerDuration,
      environment.maxTimerDuration
    );
    this.timerService
      .addTimer(timerDuration)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.snackBar.open('Timer paused.');
          this.logger.debug('[AppComponent] onAddTimerClick: ', data);
        },
        error: (err) => this.handleError(err),
      });
  }

  onPauseTimerClick(timerId: string) {
    this.timerService
      .pauseTimer(timerId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.snackBar.open('Timer paused.');
        },
        error: (err) => this.handleError(err),
      });
  }

  onStartTimerClick(timerId: string) {
    this.timerService
      .startTimer(timerId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.snackBar.open('Timer started.');
        },
        error: (err) => this.handleError(err),
      });
  }

  handleError(err: Error) {
    this.snackBar.open('Error: ' + err.message);
  }
}
