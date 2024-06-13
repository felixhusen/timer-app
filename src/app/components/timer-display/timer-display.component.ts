import { DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'timer-display',
  standalone: true,
  imports: [DecimalPipe],
  template: `
    <div class="timer-display">
      <div class="minutes">
        <span>{{ minutes | number }}</span>
      </div>
      <span class="separator">:</span>
      <div class="seconds">
        <span>{{ seconds | number }}</span>
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

    this.minutes = Math.floor(input / 60);
    this.seconds = input - this.minutes * 60;
  }

  get duration() {
    return this._duration;
  }
}
