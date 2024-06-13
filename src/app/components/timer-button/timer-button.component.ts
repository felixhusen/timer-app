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
    <button mat-button *ngIf="timerState === TimerState.ongoing" (click)="onPauseClick()">pause</button>
    <button mat-button *ngIf="timerState === TimerState.paused" (click)="onStartClick()">start</button>
  `,
  styleUrl: './timer-button.component.scss'
})
export class TimerButtonComponent {
  @Input() timerId: string;
  @Input() timerState: TimerState;
  @Output() pauseClick: EventEmitter<string> = new EventEmitter();
  @Output() startClick: EventEmitter<string> = new EventEmitter();
  TimerState = TimerState;

  constructor(private logger: NGXLogger) {}

  onPauseClick() {
    this.logger.debug('[TimerButtonComponent] pause button clicked: ', this.timerId);
    this.pauseClick.emit(this.timerId);
  }

  onStartClick() {
    this.logger.debug('[TimerButtonComponent] start button clicked: ', this.timerId);
    this.startClick.emit(this.timerId);
  }
}
