import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerRowComponent } from './timer-row.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { TimerState } from '../../services/typings';

describe('TimerRowComponent', () => {
  let component: TimerRowComponent;
  let fixture: ComponentFixture<TimerRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TimerRowComponent,
        LoggerModule.forRoot({
          level: NgxLoggerLevel.ERROR,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TimerRowComponent);
    component = fixture.componentInstance;

    // Initialise timer
    component.timer = {
      timerId: 'testId',
      currentDuration: 0,
      originalDuration: 0,
      state: TimerState.ongoing,
      createdAt: new Date().toISOString(),
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current duration', () => {
    // Test cases with format [seconds]: { minutes: number; seconds: number; }
    const testCases: Record<string, { minutes: string; seconds: string }> = {
      '10': {
        minutes: '00',
        seconds: '10',
      },
      '100': {
        minutes: '01',
        seconds: '40',
      },
      '90': {
        minutes: '01',
        seconds: '30',
      },
      '1': {
        minutes: '00',
        seconds: '01',
      },
    };

    Object.keys(testCases).forEach((duration) => {
      component.timer.currentDuration = component.timer.originalDuration =
        +duration;

      fixture.detectChanges();

      const expectedResult = testCases[duration];

      // Get the minutes and seconds element
      const minutesEl = fixture.nativeElement.querySelector(
        'timer-display .minutes span'
      );
      const secondsEl = fixture.nativeElement.querySelector(
        'timer-display .seconds span'
      );

      expect(minutesEl.textContent).toEqual(expectedResult.minutes);
      expect(secondsEl.textContent).toEqual(expectedResult.seconds);
    });
  });

  it('should display pause button', () => {
    // Set the timer state to ongoing
    component.timer.state = TimerState.ongoing;
    fixture.detectChanges();

    // Query the pause btn element
    const pauseBtnEl = fixture.nativeElement.querySelector(
      'timer-button .action-button:first-child'
    ) as HTMLElement;

    expect(pauseBtnEl.ariaLabel).toEqual('Pause Button');
  });

  it('should display start button', () => {
    // Set the timer state to ongoing
    component.timer.state = TimerState.paused;
    fixture.detectChanges();

    // Query the pause btn element
    const startButtonEl = fixture.nativeElement.querySelector(
      'timer-button .action-button:first-child'
    ) as HTMLElement;

    expect(startButtonEl.ariaLabel).toEqual('Start Button');
  });
});
