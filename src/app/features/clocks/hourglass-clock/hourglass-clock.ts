import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../core/time.service';

@Component({
  selector: 'app-hourglass-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hourglass-clock.html',
  styleUrls: ['./hourglass-clock.css']
})
export class HourglassClock implements OnInit, OnDestroy {
  time = new Date();
  sub?: Subscription;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.sub = this.timeService.currentTime$.subscribe(t => this.time = t);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  // Progreso de segundos en el minuto
  getSecondProgress(): number {
    return this.time.getSeconds() / 60;
  }
}