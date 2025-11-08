import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../core/time.service';

@Component({
  selector: 'app-digital-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './digital-clock.html',
  styleUrls: ['./digital-clock.css']
})
export class DigitalClock implements OnInit, OnDestroy {
  time = new Date();
  sub?: Subscription;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.sub = this.timeService.currentTime$.subscribe(t => this.time = t);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  format(n: number) {
    return n.toString().padStart(2, '0');
  }
}