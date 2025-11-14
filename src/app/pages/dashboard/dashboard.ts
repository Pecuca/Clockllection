import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitalClock } from '../../features/clocks/digital-clock/digital-clock';
import { AnalogClock } from '../../features/clocks/analog-clock/analog-clock';
import { BarClock } from '../../features/clocks/bar-clock/bar-clock';
import { RingsClock } from '../../features/clocks/rings-clock/rings-clock';
import { ColorClock } from '../../features/clocks/color-clock/color-clock';
import { BlockClock } from '../../features/clocks/block-clock/block-clock';
import { TypographicClock } from '../../features/clocks/typographic-clock/typographic-clock';
import { GoldeneyeAnalog } from '../../features/clocks/goldeneye-analog/goldeneye-analog';
import { HourglassClock } from '../../features/clocks/hourglass-clock/hourglass-clock';
import { SonarClock } from '../../features/clocks/sonar-clock/sonar-clock';
import { TimeService } from '../../core/time.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DigitalClock, AnalogClock, BarClock, RingsClock, ColorClock, BlockClock, TypographicClock, GoldeneyeAnalog, HourglassClock, SonarClock],
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
  { key: 'blocks', label: 'Bloques' },
  { key: 'typographic', label: 'Tipográfico' },
  { key: 'goldeneye-analog', label: 'Goldeneye Analógico' },
  { key: 'majora-hud', label: 'Majora HUD' },
  { key: 'hourglass', label: 'Reloj de Arena' },
  { key: 'sonar', label: 'Sonar' }
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
