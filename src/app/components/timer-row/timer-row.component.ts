import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TimerDisplayComponent } from '../timer-display/timer-display.component';
import { TimerButtonComponent } from '../timer-button/timer-button.component';
import { ITimer } from '../../services/typings';

@Component({
  selector: 'timer-row',
  standalone: true,
  imports: [TimerDisplayComponent, TimerButtonComponent, MatCardModule],
  templateUrl: './timer-row.component.html',
  styleUrl: './timer-row.component.scss'
})
export class TimerRowComponent {
  @Input() timer: ITimer;

  @Output() pauseClick: EventEmitter<string> = new EventEmitter();
  @Output() startClick: EventEmitter<string> = new EventEmitter();
  @Output() deleteClick: EventEmitter<string> = new EventEmitter();

  onPauseClick(timerId: string) {
    this.pauseClick.emit(timerId);
  }

  onStartClick(timerId: string) {
    this.startClick.emit(timerId);
  }

  onDeleteClick(timerId: string) {
    this.deleteClick.emit(timerId);
  }
}
