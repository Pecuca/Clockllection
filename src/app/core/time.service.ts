import { Injectable } from '@angular/core';
import { BehaviorSubject, timer, map, combineLatest } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TimeService {
  private offsetSeconds$ = new BehaviorSubject<number>(0);
  // Emit immediately and then every 100ms for smoother visual updates
  private tick$ = timer(0, 100).pipe(map(() => new Date()));

  // Combine tick with offset and expose current time with offset applied
  currentTime$ = combineLatest([this.tick$, this.offsetSeconds$]).pipe(
    map(([now, offset]) => new Date(now.getTime() + offset * 1000))
  );

  setOffset(seconds: number) {
    this.offsetSeconds$.next(seconds);
  }

  // Backwards-compatible setter if other code uses setTime
  setTime(date: Date) {
    // set the underlying tick to this exact date by setting offset relative to now
    const now = new Date();
    const diff = Math.floor((date.getTime() - now.getTime()) / 1000);
    this.setOffset(diff);
  }
}

