import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../core/time.service';

@Component({
  selector: 'app-goldeneye-analog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './goldeneye-analog.html',
  styleUrls: ['./goldeneye-analog.css']
})
export class GoldeneyeAnalog implements OnInit, OnDestroy {
  time = new Date();
  sub?: Subscription;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.sub = this.timeService.currentTime$.subscribe(t => this.time = t);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  // Rotación de manecillas
  getRotation(unit: number, max: number) {
    return (unit / max) * 360;
  }

  // Progreso del día en el mes
  getDayProgress(): number {
    const day = this.time.getDate();
    const daysInMonth = new Date(this.time.getFullYear(), this.time.getMonth() + 1, 0).getDate();
    return (day / daysInMonth) * 100;
  }

  // Progreso del mes en el año
  getMonthProgress(): number {
    const month = this.time.getMonth() + 1;
    return (month / 12) * 100;
  }
}