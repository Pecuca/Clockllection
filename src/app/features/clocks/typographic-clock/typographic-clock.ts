import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
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

  constructor(private timeService: TimeService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.sub = this.timeService.currentTime$.subscribe(t => { this.time = t; this.cd.detectChanges(); });
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

    const numberToSpanish = (n: number) => {
      const small: string[] = [
        'cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve',
        'diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve',
        'veinte','veintiuno','veintidós','veintitrés','veinticuatro','veinticinco','veintiséis','veintisiete','veintiocho','veintinueve'
      ];
      if (n <= 29) return small[n];
      const tensMap: { [k: number]: string } = {30: 'treinta', 40: 'cuarenta', 50: 'cincuenta'};
      const tens = Math.floor(n / 10) * 10;
      const unit = n % 10;
      if (unit === 0) return tensMap[tens] || n.toString();
      return `${tensMap[tens]} y ${small[unit]}`;
    };

    const h = hourWords[hours % 12];
    const prefix = (hours % 12 === 1) ? 'Es la' : 'Son las';

    if (minutes === 0) return `${prefix} ${h} en punto`;

    const minutesWords = numberToSpanish(minutes);
    return `${prefix} ${h} y ${minutesWords} minutos`;
  }
}