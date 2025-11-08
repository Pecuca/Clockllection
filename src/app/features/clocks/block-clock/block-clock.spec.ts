import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockClock } from './block-clock';

describe('BlockClock', () => {
  let component: BlockClock;
  let fixture: ComponentFixture<BlockClock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockClock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockClock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
