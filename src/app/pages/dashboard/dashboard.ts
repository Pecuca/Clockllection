import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitalClock } from '../../features/clocks/digital-clock/digital-clock';
import { AnalogClock } from '../../features/clocks/analog-clock/analog-clock';
import { BarClock } from '../../features/clocks/bar-clock/bar-clock';
import { RingsClock } from '../../features/clocks/rings-clock/rings-clock';
import { ColorClock } from '../../features/clocks/color-clock/color-clock';
import { BlockClock } from '../../features/clocks/block-clock/block-clock';
import { TimeService } from '../../core/time.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DigitalClock, AnalogClock, BarClock, RingsClock, ColorClock, BlockClock],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  visualizers = [
  { key: 'digital', label: 'Digital' },
  { key: 'analog', label: 'Analógico' },
  { key: 'bars', label: 'Barras' },
  { key: 'rings', label: 'Anillos' },
  { key: 'color', label: 'Colores' },
  { key: 'blocks', label: 'Bloques' }
];
  selected = 'digital';
  offsetSeconds = 0;

  constructor(private time: TimeService) {}

  onVisualizerChange(key: string) {
    this.selected = key;
  }

  onOffsetChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.offsetSeconds = parseInt(target.value, 10);
    this.time.setOffset(this.offsetSeconds);
  }
}
