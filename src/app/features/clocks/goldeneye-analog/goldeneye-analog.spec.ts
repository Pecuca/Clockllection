import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldeneyeAnalog } from './goldeneye-analog';

describe('GoldeneyeAnalog', () => {
  let component: GoldeneyeAnalog;
  let fixture: ComponentFixture<GoldeneyeAnalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoldeneyeAnalog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoldeneyeAnalog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
