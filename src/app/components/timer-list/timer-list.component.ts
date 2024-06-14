import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TimerRowComponent } from '../timer-row/timer-row.component';
import { ITimer, TimerSortDirection } from '../../services/typings';
import { NgFor, NgIf } from '@angular/common';
import { TimerEmptyRowComponent } from '../timer-empty-row/timer-empty-row.component';

@Component({
  selector: 'timer-list',
  standalone: true,
  imports: [
    TimerEmptyRowComponent,
    TimerRowComponent,
    MatButtonModule,
    MatIconModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './timer-list.component.html',
  styleUrl: './timer-list.component.scss',
})
export class TimerListComponent {
  @Input() timers: ITimer[] | null;
  @Input() sort: TimerSortDirection | null;

  @Output() pauseClick: EventEmitter<string> = new EventEmitter();
  @Output() startClick: EventEmitter<string> = new EventEmitter();
  @Output() addTimerClick: EventEmitter<void> = new EventEmitter();
  @Output() sortChange: EventEmitter<TimerSortDirection> = new EventEmitter();

  TimerSortDirection = TimerSortDirection;

  onAddTimerClick() {
    this.addTimerClick.emit();
  }

  onPauseClick(timerId: string) {
    this.pauseClick.emit(timerId);
  }

  onStartClick(timerId: string) {
    this.startClick.emit(timerId);
  }

  onSortChange(sortDirection: TimerSortDirection) {
    this.sortChange.emit(sortDirection);
  }

  trackByFn(index: number, timer: ITimer) {
    return timer.timerId;
  }
}
