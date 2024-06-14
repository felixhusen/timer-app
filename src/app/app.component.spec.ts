import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ITimer, TimerState } from './services/typings';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        LoggerModule.forRoot({
          level: NgxLoggerLevel.ERROR,
        }),
        HttpClientTestingModule,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the timer app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const timerApp = compiled.querySelector('.timer-app');

    expect(timerApp).toBeTruthy();
  });

  it('should display timer list', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    const timerTestCases: ITimer[] = [
      {
        timerId: 'testId1',
        state: TimerState.ongoing,
        currentDuration: 90,
        originalDuration: 90,
        createdAt: new Date().toISOString(),
      },
      {
        timerId: 'testId2',
        state: TimerState.paused,
        currentDuration: 60,
        originalDuration: 30,
        createdAt: new Date().toISOString(),
      },
    ];

    fixture.detectChanges();

    // Assign the timers test cases
    component.timerListCmp.timers = timerTestCases;
    fixture.detectChanges();

    // Query selector the timer rows wrapper and check if there is the same number of rows as the data
    const timerRowsWrapperEl = fixture.nativeElement.querySelector(
      '.timer-app timer-list .timer-list .timer-rows'
    ) as HTMLElement;
    const timerRows = timerRowsWrapperEl.querySelectorAll('timer-row');

    expect(timerRows.length).toEqual(timerTestCases.length);
  });
});
