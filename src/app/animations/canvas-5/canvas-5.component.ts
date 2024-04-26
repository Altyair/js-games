import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import AnimationCore from '../../libs/game2d/AnimationCore';

@Component({
    selector: 'canvas5-test',
    templateUrl: './canvas-5.component.html',
    styleUrls: ['./canvas-5.component.scss'],
})
export class Canvas5Component implements AfterViewInit, OnDestroy {
    @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement> | undefined;
    public context: CanvasRenderingContext2D | null | undefined;
    private anim: any;

    ngAfterViewInit(): void {
        this.context = this.canvas!.nativeElement.getContext('2d');

        let w: number = (this.canvas!.nativeElement.width = innerWidth),
            h: number = (this.canvas!.nativeElement.height = innerHeight),
            startX = 160,
            startY = 340,
            countParticles = 100,
            cx,
            cy,
            t = 0;
        const ctx = this.context!;

        const draw = () => {
            // clear canvas
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, w, h);

            for (let i = 1; i < countParticles; i++) {
                const it = i + t; // постоянно увеличивается на t: 1, 1.01, 1.02, 1.03, ...
                const q = i / countParticles; // чем больше i тем больше радиус движения

                const z = Math.cos(it);
                const kx = Math.sin(it);

                cx = startX * 2 + kx * startX;
                cy = startY / 2 + q * startY;

                const hue = (it + t) % 360;
                const lightness = 50 + 50 * z;
                ctx.fillStyle = `hsl(${hue}, ${lightness}%, 50%)`;

                ctx.fillRect(cx, cy, 10, 10);
            }
            t += 0.005;
        };
        this.anim = new AnimationCore();
        this.anim.callback = () => {
            draw();
        };
        this.anim.start();
    }

    ngOnDestroy(): void {
        this.anim.stop();
    }
}
