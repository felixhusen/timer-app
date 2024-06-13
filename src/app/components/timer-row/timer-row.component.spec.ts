import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerRowComponent } from './timer-row.component';

describe('TimerRowComponent', () => {
  let component: TimerRowComponent;
  let fixture: ComponentFixture<TimerRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
