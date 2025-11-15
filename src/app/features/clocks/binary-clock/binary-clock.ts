import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../core/time.service';

@Component({
  selector: 'app-binary-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './binary-clock.html',
  styleUrls: ['./binary-clock.css']
})
export class BinaryClock implements OnInit, OnDestroy {
  time = new Date();
  sub?: Subscription;

  constructor(private timeService: TimeService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.sub = this.timeService.currentTime$.subscribe(t => { this.time = t; this.cd.detectChanges(); });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  private toBits(value: number, bits: number): number[] {
    const arr = new Array(bits).fill(0);
    for (let i = 0; i < bits; i++) {
      const shift = bits - 1 - i;
      arr[i] = (value >> shift) & 1;
    }
    return arr;
  }

  getBits() {
    const h = this.time.getHours();
    const m = this.time.getMinutes();
    const s = this.time.getSeconds();

    // Hours: 0-23 -> needs 5 bits
    // Minutes/Seconds: 0-59 -> needs 6 bits
    return {
      hours: this.toBits(h, 5),
      minutes: this.toBits(m, 6),
      seconds: this.toBits(s, 6)
    };
  }
}
