import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonarClock } from './sonar-clock';

describe('SonarClock', () => {
  let component: SonarClock;
  let fixture: ComponentFixture<SonarClock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SonarClock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SonarClock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
