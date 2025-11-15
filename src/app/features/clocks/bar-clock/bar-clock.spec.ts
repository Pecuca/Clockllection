import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarClock } from './bar-clock';

describe('BarClock', () => {
  let component: BarClock;
  let fixture: ComponentFixture<BarClock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarClock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarClock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
