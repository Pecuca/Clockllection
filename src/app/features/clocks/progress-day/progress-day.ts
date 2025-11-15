import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../core/time.service';

@Component({
  selector: 'app-progress-day',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-day.html',
  styleUrls: ['./progress-day.css']
})
export class ProgressDay implements OnInit, OnDestroy {
  time: Date = new Date();
  sub?: Subscription;
  percent = 0;
  radius = 40;
  circumference = 2 * Math.PI * this.radius;
  dash = this.circumference;

  constructor(private timeService: TimeService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.sub = this.timeService.currentTime$.subscribe(t => {
      this.time = t;
      const seconds = t.getHours() * 3600 + t.getMinutes() * 60 + t.getSeconds();
      this.percent = (seconds / (24 * 3600)) * 100;
      // calculate dash offset for stroke-dashoffset (circumference * (1 - percent))
      this.dash = this.circumference * (1 - this.percent / 100);
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
