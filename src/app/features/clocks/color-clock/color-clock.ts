import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../core/time.service';

@Component({
  selector: 'app-color-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color-clock.html',
  styleUrls: ['./color-clock.css']
})
export class ColorClock implements OnInit, OnDestroy {
  time = new Date();
  sub?: Subscription;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.sub = this.timeService.currentTime$.subscribe(t => this.time = t);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  getBackgroundColor() {
    const h = this.time.getHours() * 10;
    const m = this.time.getMinutes() * 4;
    const s = this.time.getSeconds() * 4;
    return `rgb(${h % 255}, ${m % 255}, ${s % 255})`;
  }
}