import { Component, Input } from '@angular/core';
import { TimerPipe } from '../../pipes/timer.pipe';

@Component({
  selector: 'timer-display',
  standalone: true,
  imports: [TimerPipe],
  template: `
    <div class="timer-display">
      <div class="minutes">
        <span>{{ minutes | timer }}</span>
      </div>
      <span class="separator">:</span>
      <div class="seconds">
        <span>{{ seconds | timer }}</span>
      </div>
    </div>
  `,
  styleUrl: './timer-display.component.scss',
})
export class TimerDisplayComponent {
  minutes: number;
  seconds: number;
  private _duration: number;

  @Input() set duration(input: number) {
    this._duration = input;

    // Calculate the Minutes and Seconds based on the duration (in seconds)
    this.minutes = Math.floor(input / 60);
    this.seconds = input - this.minutes * 60;
  }

  get duration() {
    return this._duration;
  }
}
