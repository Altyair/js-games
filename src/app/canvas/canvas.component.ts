import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Arc from 'src/app/games/shared/objects/Arc';
import Square from '../games/shared/objects/Square';
import AnimationCore from '../games/shared/AnimationCore';

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

        const ball = new Arc(this.context, {
            x: 200,
            y: 50,
            radius: 20,
            xmov: 2,
            ymov: 0.5,
            lineWidth: 1,
            strokeStyle: 'red',
            fillStyle: 'red',
        });
        const square = new Square(this.context, {
            x: 600,
            y: 300,
        });

        const anim = new AnimationCore();
        anim.callback = () => {
            square.angl += 0.009;

            this.context?.clearRect(0, 0, 1200, 600);
            square.create();
        };
        anim.start();
    }
}
