import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TimerState } from '../../services/typings';
import { NgIf } from '@angular/common';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'timer-button',
  standalone: true,
  imports: [MatButtonModule, NgIf],
  template: `
    <div class="action-buttons-wrapper">
      <!-- Pause Button -->
      <button
        class="action-button"
        mat-icon-button
        aria-label="Pause Button"
        *ngIf="timerState === TimerState.ongoing"
        (click)="onPauseClick()"
      >
        <img class="icon" src="/assets/icons/pause-fill.svg" />
      </button>

      <!-- Start Button -->
      <button
        class="action-button"
        mat-icon-button
        aria-label="Start Button"
        *ngIf="timerState === TimerState.paused"
        (click)="onStartClick()"
      >
        <img class="icon" src="/assets/icons/play-fill.svg" />
      </button>

      <!-- Delete Button -->
      <button
        class="action-button"
        mat-icon-button
        aria-label="Delete Button"
        (click)="onDeleteClick()"
      >
        <img class="icon" src="/assets/icons/xmark-solid.svg" />
      </button>
    </div>
  `,
  styleUrl: './timer-button.component.scss',
})
export class TimerButtonComponent {
  @Input() timerId: string;
  @Input() timerState: TimerState;

  @Output() pauseClick: EventEmitter<string> = new EventEmitter();
  @Output() startClick: EventEmitter<string> = new EventEmitter();
  @Output() deleteClick: EventEmitter<string> = new EventEmitter();

  TimerState = TimerState;

  constructor(private logger: NGXLogger) {}

  onPauseClick() {
    this.logger.debug(
      '[TimerButtonComponent] pause button clicked: ',
      this.timerId
    );
    this.pauseClick.emit(this.timerId);
  }

  onStartClick() {
    this.logger.debug(
      '[TimerButtonComponent] start button clicked: ',
      this.timerId
    );
    this.startClick.emit(this.timerId);
  }

  onDeleteClick() {
    this.logger.debug(
      '[TimerButtonComponent] delete button clicked: ',
      this.timerId
    );
    this.deleteClick.emit(this.timerId);
  }
}
