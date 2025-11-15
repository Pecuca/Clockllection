import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { TimeService } from '../../../core/time.service';

interface Particle { x: number; y: number; tx: number; ty: number; vx: number; vy: number; }

@Component({
  selector: 'app-particle-swarm-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './particle-swarm-clock.html',
  styleUrls: ['./particle-swarm-clock.css']
})
export class ParticleSwarmClock implements OnInit, OnDestroy {
  particles: Particle[] = [];
  sub?: Subscription;
  rafId = 0;
  time = new Date();

  // number of particles (tunable)
  readonly N = 220;

  // small 5x7 digit font (0-9) rows of 7, cols 5 (1 = filled)
  readonly FONT: number[][][] = [
    // 0
    [
      [0,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,1,1],
      [1,0,1,0,1],
      [1,1,0,0,1],
      [1,0,0,0,1],
      [0,1,1,1,0]
    ],
    // 1
    [
      [0,0,1,0,0],
      [0,1,1,0,0],
      [1,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [1,1,1,1,1]
    ],
    // 2
    [
      [0,1,1,1,0],
      [1,0,0,0,1],
      [0,0,0,0,1],
      [0,0,0,1,0],
      [0,0,1,0,0],
      [0,1,0,0,0],
      [1,1,1,1,1]
    ],
    // 3
    [
      [0,1,1,1,0],
      [1,0,0,0,1],
      [0,0,0,0,1],
      [0,0,1,1,0],
      [0,0,0,0,1],
      [1,0,0,0,1],
      [0,1,1,1,0]
    ],
    // 4
    [
      [0,0,0,1,0],
      [0,0,1,1,0],
      [0,1,0,1,0],
      [1,0,0,1,0],
      [1,1,1,1,1],
      [0,0,0,1,0],
      [0,0,0,1,0]
    ],
    // 5
    [
      [1,1,1,1,1],
      [1,0,0,0,0],
      [1,1,1,1,0],
      [0,0,0,0,1],
      [0,0,0,0,1],
      [1,0,0,0,1],
      [0,1,1,1,0]
    ],
    // 6
    [
      [0,0,1,1,0],
      [0,1,0,0,0],
      [1,0,0,0,0],
      [1,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [0,1,1,1,0]
    ],
    // 7
    [
      [1,1,1,1,1],
      [0,0,0,0,1],
      [0,0,0,1,0],
      [0,0,1,0,0],
      [0,1,0,0,0],
      [0,1,0,0,0],
      [0,1,0,0,0]
    ],
    // 8
    [
      [0,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [0,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [0,1,1,1,0]
    ],
    // 9
    [
      [0,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [0,1,1,1,1],
      [0,0,0,0,1],
      [0,0,0,1,0],
      [0,1,1,0,0]
    ]
  ];

  private lastPattern = '';

  constructor(private timeService: TimeService, private cd: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit(): void {
    // init particles
    for (let i = 0; i < this.N; i++) {
      this.particles.push({ x: Math.random() * 200, y: Math.random() * 100, tx: Math.random() * 200, ty: Math.random() * 100, vx: 0, vy: 0 });
    }

    this.sub = this.timeService.currentTime$.subscribe(t => {
      this.time = t;
      const pattern = this.getPatternString(t);
      if (pattern !== this.lastPattern) {
        this.lastPattern = pattern;
        const targets = this.patternToTargets(pattern);
        this.assignTargets(targets);
      }
    });

    // start RAF loop outside Angular to avoid heavy CD
    this.ngZone.runOutsideAngular(() => this.raf());
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    cancelAnimationFrame(this.rafId);
  }

  // build a string like "HHMM" from current time
  private getPatternString(d: Date): string {
    const h = ('0' + d.getHours()).slice(-2);
    const m = ('0' + d.getMinutes()).slice(-2);
    return h + m;
  }

  // Convert pattern into array of target points (x,y) in SVG coords
  private patternToTargets(pattern: string): {x:number,y:number}[] {
    // layout: four digits side-by-side; each digit 5x7 pixels; spacing
    const digits = pattern.split('').map(ch => parseInt(ch, 10));
    const digitW = 14; // space per digit
    const startX = 0; // temporary, we'll center later
    const startY = 8; // top padding
    const targets: {x:number,y:number}[] = [];
    for (let di = 0; di < digits.length; di++) {
      const d = digits[di];
      const font = this.FONT[d];
      const gx = startX + di * digitW;
      for (let r = 0; r < font.length; r++) {
        for (let c = 0; c < font[r].length; c++) {
          if (font[r][c]) {
            const x = gx + c * 2.6; // spacing
            const y = startY + r * 2.6;
            targets.push({ x, y });
          }
        }
      }
    }

    // center the targets into the SVG area (200x100)
    if (targets.length === 0) return targets;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const t of targets) {
      if (t.x < minX) minX = t.x;
      if (t.x > maxX) maxX = t.x;
      if (t.y < minY) minY = t.y;
      if (t.y > maxY) maxY = t.y;
    }
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const canvasCenterX = 100; // viewBox 0..200
    const canvasCenterY = 50;  // viewBox 0..100
    const shiftX = canvasCenterX - centerX;
    const shiftY = canvasCenterY - centerY;
    for (const t of targets) {
      t.x += shiftX;
      t.y += shiftY;
    }

    return targets;
  }

  // Assign nearest particles to targets (simple greedy)
  private assignTargets(targets: {x:number,y:number}[]) {
    if (!targets || targets.length === 0) {
      // no targets: send particles to scattered area
      for (const p of this.particles) {
        p.tx = 100 + (Math.random()-0.5)*140;
        p.ty = 50 + (Math.random()-0.5)*80;
      }
      return;
    }

    // shuffle particles to vary visual distribution
    for (let i = this.particles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.particles[i], this.particles[j]] = [this.particles[j], this.particles[i]];
    }

    // Assign every particle to a target by cycling through targets, adding small jitter
    for (let i = 0; i < this.particles.length; i++) {
      const t = targets[i % targets.length];
      this.particles[i].tx = t.x + (Math.random() - 0.5) * 2.4; // wider jitter so particles fill shape
      this.particles[i].ty = t.y + (Math.random() - 0.5) * 2.4;
    }
  }

  // RAF loop: simple spring motion towards target
  private raf = () => {
    const friction = 0.85;
    const ease = 0.12;
    for (const p of this.particles) {
      const dx = p.tx - p.x;
      const dy = p.ty - p.y;
      p.vx = p.vx * friction + dx * ease;
      p.vy = p.vy * friction + dy * ease;
      p.x += p.vx;
      p.y += p.vy;
    }

    // schedule an Angular CD tick occasionally (every 4 frames ~60fps->15fps)
    if ((performance.now() | 0) % 4 === 0) {
      this.ngZone.run(() => this.cd.detectChanges());
    }

    this.rafId = requestAnimationFrame(this.raf);
  }

}
