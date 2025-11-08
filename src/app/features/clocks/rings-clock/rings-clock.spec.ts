import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RingsClock } from './rings-clock';

describe('RingsClock', () => {
  let component: RingsClock;
  let fixture: ComponentFixture<RingsClock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RingsClock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RingsClock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
