import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypographicClock } from './typographic-clock';

describe('TypographicClock', () => {
  let component: TypographicClock;
  let fixture: ComponentFixture<TypographicClock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypographicClock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypographicClock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
