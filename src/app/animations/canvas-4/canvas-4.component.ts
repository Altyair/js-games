import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import AnimationCore from '../../libs/game2d/AnimationCore';
import Arc from '../../libs/game2d/objects/Arc';

@Component({
    selector: 'canvas4-test',
    templateUrl: './canvas-4.component.html',
    styleUrls: ['./canvas-4.component.scss'],
})
export class Canvas4Component implements AfterViewInit, OnDestroy {
    @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement> | undefined;
    public context: CanvasRenderingContext2D | null | undefined;
    private anim: any;

    ngAfterViewInit(): void {
        this.context = this.canvas!.nativeElement.getContext('2d');

        // init variables
        const drawCircles = () => {
            let w: number = (this.canvas!.nativeElement.width = innerWidth),
                h: number = (this.canvas!.nativeElement.height = innerHeight),
                angle: number = 0,
                countCircles: number = 0,
                s: number = 5;

            const drawCircles = () => {
                if (countCircles >= 500) this.anim.stop();

                const len = (10 * angle) / 20;
                const x = len * Math.sin(angle);
                const y = len * Math.cos(angle);

                new Arc(this.context!, {
                    radius: 10,
                    x: x + 600,
                    y: y + 300,
                });
                angle++;
                countCircles++;
            };

            const process = () => {
                drawCircles();
            };

            // run animation process
            this.anim = new AnimationCore();
            this.anim.callback = () => {
                process();
            };
            this.anim.start();
        };
        drawCircles();
    }

    ngOnDestroy(): void {
        this.anim.stop();
    }
}
