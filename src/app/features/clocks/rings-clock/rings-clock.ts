import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../core/time.service';

@Component({
  selector: 'app-rings-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rings-clock.html',
  styleUrls: ['./rings-clock.css']
})
export class RingsClock implements OnInit, OnDestroy {
  time = new Date();
  sub?: Subscription;

  constructor(private timeService: TimeService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.sub = this.timeService.currentTime$.subscribe(t => { this.time = t; this.cd.detectChanges(); });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  getPercent(unit: number, max: number) {
    return (unit / max) * 100;
  }
}