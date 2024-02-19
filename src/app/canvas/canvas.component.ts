import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Arc from '../libs/game2d/objects/Arc';
import Square from '../libs/game2d/objects/Square';
import Plane from '../libs/game2d/objects/Line';
import AnimationCore from '../libs/game2d/AnimationCore';
import CheckCollisions from '../libs/game2d/CheckCollisions';

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
            x: 600,
            y: 50,
            radius: 20,
            xmov: 1.5,
            ymov: 1.2,
            lineWidth: 1,
            strokeStyle: 'red',
            fillStyle: 'red',
        });

        // const ball1 = new Arc(this.context, {
        //     x: 600,
        //     y: 300,
        //     radius: 20,
        //     xmov: -0.5,
        //     ymov: 3,
        //     lineWidth: 1,
        //     strokeStyle: 'green',
        //     fillStyle: 'green',
        // });

        // квадрат
        const outerSquare = new Square(this.context, {
            x: 600,
            y: 300,
            size: 300,
            angl: 90,
        });

        // квадрат
        const innerSquare = new Square(this.context, {
            x: 600,
            y: 300,
            size: 100,
            angl: 120,
        });

        const plane = new Plane(this.context, {
            x: 600,
            y: 170,
            size: 100,
            angl: 120,
        });

        const anim = new AnimationCore();
        anim.callback = () => {
            outerSquare.angl += 0.0009;
            innerSquare.angl -= 0.009;

            this.context?.clearRect(0, 0, 1200, 600);
            outerSquare.create();
            innerSquare.create();
            plane.create();
            // ball1.move();
            ball.move();

            // CheckCollisions.checkBallWithPlane(ball1, outerSquare, anim, this.context);
            CheckCollisions.checkArcWithPlane(ball, outerSquare.sides, anim, this.context);
            CheckCollisions.checkArcWithPlane(ball, innerSquare.sides, anim, this.context);
            CheckCollisions.checkArcWithPlane(ball, [plane.side], anim, this.context);
        };
        anim.start();
    }
}
