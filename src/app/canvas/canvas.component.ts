import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Arc from 'src/app/games/shared/objects/Arc';
import Square from '../games/shared/objects/Square';
import AnimationCore from '../games/shared/AnimationCore';
import CheckCollisions from '../games/shared/CheckCollisions';

@Component({
    selector: 'canvas-test',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit {
    @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement> | undefined;
    public context: CanvasRenderingContext2D | null | undefined;

    ngAfterViewInit(): void {
        this.context = this.canvas!.nativeElement.getContext('2d');

        // шар
        const ball = new Arc(this.context, {
            x: 800,
            y: 300,
            radius: 20,
            xmov: -2,
            ymov: 3,
            lineWidth: 1,
            strokeStyle: 'red',
            fillStyle: 'red',
        });

        // квадрат
        const square = new Square(this.context, {
            x: 600,
            y: 300,
            size: 300,
            angl: 5,
        });

        const anim = new AnimationCore();
        anim.callback = () => {
            square.angl += 0.05;

            CheckCollisions.checkBallWithPlane(ball, square, anim);

            this.context?.clearRect(0, 0, 1200, 600);
            square.create();
            ball.move();
            ball.create();
        };
        anim.start();
    }
}
