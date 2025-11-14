import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../core/time.service';

@Component({
  selector: 'app-sonar-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sonar-clock.html',
  styleUrls: ['./sonar-clock.css']
})
export class SonarClock implements OnInit, OnDestroy {
  time = new Date();
  sub?: Subscription;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.sub = this.timeService.currentTime$.subscribe(t => this.time = t);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  // Barrido del radar (segundos → rotación)
  getSweepRotation(): number {
    return (this.time.getSeconds() / 60) * 360;
  }

  // Barra de batería (progreso del día)
  getBatteryLevel(): number {
    const totalMinutes = 24 * 60;
    const currentMinutes = this.time.getHours() * 60 + this.time.getMinutes();
    return 100 - (currentMinutes / totalMinutes) * 100;
  }

  // Puntos en el radar (cantidad = hora actual)
  getRadarPoints(): {x: number, y: number}[] {
    const hour = (this.time.getHours() % 12) || 12;
    const points: {x: number, y: number}[] = [];

    for (let i = 0; i < hour; i++) {
      const angle = (i / hour) * 2 * Math.PI;
      const radius = 40; // distancia del centro
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);
      points.push({x, y});
    }

    // Snake en el centro
    if (hour === 12) {
      points.push({x: 50, y: 50});
    }

    return points;
  }
}