import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitalClock } from '../../features/clocks/digital-clock/digital-clock';
import { BinaryClock } from '../../features/clocks/binary-clock/binary-clock';
import { BarClock } from '../../features/clocks/bar-clock/bar-clock';
import { RingsClock } from '../../features/clocks/rings-clock/rings-clock';
import { ColorClock } from '../../features/clocks/color-clock/color-clock';
import { BlockClock } from '../../features/clocks/block-clock/block-clock';
import { TypographicClock } from '../../features/clocks/typographic-clock/typographic-clock';
import { ProgressDay } from '../../features/clocks/progress-day/progress-day';
import { HourglassClock } from '../../features/clocks/hourglass-clock/hourglass-clock';
// Sonar removed — replaced by BinaryClock
import { TimeService } from '../../core/time.service';
import { ParticleSwarmClock } from '../../features/clocks/particle-swarm-clock/particle-swarm-clock';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DigitalClock, BinaryClock, BarClock, RingsClock, ColorClock, BlockClock, TypographicClock, ProgressDay, HourglassClock, ParticleSwarmClock],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})

export class Dashboard {
  visualizers = [
  { key: 'digital', label: 'Digital' },
  { key: 'bars', label: 'Barras' },
  { key: 'rings', label: 'Anillos' },
  { key: 'color', label: 'Colores' },
  { key: 'blocks', label: 'Bloques' },
  { key: 'typographic', label: 'Tipográfico' },
  { key: 'progress', label: 'Progreso del Día' },
  { key: 'hourglass', label: 'Reloj de Arena' },
  { key: 'swarm', label: 'Particle Swarm' },
  { key: 'binary', label: 'Binary' }
];

  selected = 'digital';
  offsetSeconds = 0;

  constructor(private time: TimeService, private auth: AuthService, private router: Router) {}

  get currentUserName() {
    const u = this.auth.currentUser();
    return u ? u.username || u.email : '';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  onVisualizerChange(key: string) {
    this.selected = key;
  }

  onOffsetChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.offsetSeconds = parseInt(target.value, 10) || 0;
    this.time.setOffset(this.offsetSeconds);
  }

  resetOffset() {
    this.offsetSeconds = 0;
    this.time.setOffset(0);
  }

}
