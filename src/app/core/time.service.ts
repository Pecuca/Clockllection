import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  private offsetSeconds$ = new BehaviorSubject<number>(0);
  private tick$ = interval(1000).pipe(map(() => new Date()));

  currentTime$ = this.tick$.pipe(
    map(now => new Date(now.getTime() + this.offsetSeconds$.value * 1000))
  );

  setOffset(seconds: number) {
    this.offsetSeconds$.next(seconds);
  }
}