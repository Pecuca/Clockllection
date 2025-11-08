import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../core/time.service';

@Component({
  selector: 'app-block-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block-clock.html',
  styleUrls: ['./block-clock.css']
})
export class BlockClock implements OnInit, OnDestroy {
  time = new Date();
  sub?: Subscription;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.sub = this.timeService.currentTime$.subscribe(t => this.time = t);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  getBlocks(unit: number, max: number) {
    return Array.from({ length: max }, (_, i) => i < unit);
  }
}