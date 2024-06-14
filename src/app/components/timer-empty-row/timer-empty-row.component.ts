import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'timer-empty-row',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <mat-card class="timer-row">
      <mat-card-content class="card-content">
        It looks like you don't have any timers yet. Please press 'Add' button
        to set one up.
      </mat-card-content>
    </mat-card>
  `,
  styleUrl: './timer-empty-row.component.scss',
})
export class TimerEmptyRowComponent {}
