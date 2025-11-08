import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorClock } from './color-clock';

describe('ColorClock', () => {
  let component: ColorClock;
  let fixture: ComponentFixture<ColorClock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorClock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorClock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
