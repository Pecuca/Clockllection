import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../core/time.service';

@Component({
  selector: 'app-typographic-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './typographic-clock.html',
  styleUrls: ['./typographic-clock.css']
})
export class TypographicClock implements OnInit, OnDestroy {
  time = new Date();
  sub?: Subscription;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.sub = this.timeService.currentTime$.subscribe(t => this.time = t);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  getTextualTime(): string {
    const hours = this.time.getHours();
    const minutes = this.time.getMinutes();

    const hourWords = [
      'doce','una','dos','tres','cuatro','cinco',
      'seis','siete','ocho','nueve','diez','once'
    ];
    const minuteWords = [
      'en punto','cinco','diez','quince','veinte','veinticinco',
      'media','treinta y cinco','cuarenta','cuarenta y cinco','cincuenta','cincuenta y cinco'
    ];

    const h = hourWords[hours % 12];
    let m: string;

    if (minutes === 0) m = 'en punto';
    else if (minutes % 5 === 0) m = minuteWords[minutes / 5];
    else m = `${minutes} minutos`;

    return `Son las ${h} y ${m}`;
  }
}