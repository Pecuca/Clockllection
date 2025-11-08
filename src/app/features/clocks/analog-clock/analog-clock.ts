import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../core/time.service';

@Component({
  selector: 'app-analog-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analog-clock.html',
  styleUrls: ['./analog-clock.css']
})
export class AnalogClock implements OnInit, OnDestroy {
  time = new Date();
  sub?: Subscription;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.sub = this.timeService.currentTime$.subscribe(t => this.time = t);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  getRotation(unit: number, max: number) {
    return (unit / max) * 360;
  }
}