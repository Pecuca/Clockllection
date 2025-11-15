import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourglassClock } from './hourglass-clock';

describe('HourglassClock', () => {
  let component: HourglassClock;
  let fixture: ComponentFixture<HourglassClock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourglassClock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourglassClock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
