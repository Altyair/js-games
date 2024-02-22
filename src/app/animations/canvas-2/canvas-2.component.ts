import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import AnimationCore from '../../libs/game2d/AnimationCore';

@Component({
    selector: 'canvas2-test',
    templateUrl: './canvas-2.component.html',
    styleUrls: ['./canvas-2.component.scss'],
})
export class Canvas2Component implements AfterViewInit {
    @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement> | undefined;
    public context: CanvasRenderingContext2D | null | undefined;

    ngAfterViewInit(): void {
        this.context = this.canvas!.nativeElement.getContext('2d');

        const config: any = {
            smooth: 0.65,
            sphereRad: 300,
            bigDotRad: 35,
            mouseSize: 120,
        };

        let w: number = (this.canvas!.nativeElement.width = innerWidth),
            h: number = (this.canvas!.nativeElement.height = innerHeight),
            mouse: any,
            time: number = 0,
            time1: number = 0;

        const startX = w! / 2;
        const startY = h! / 1.4;

        const drawBezierPoints = () => {
            this.context?.beginPath();
            this.context!.lineWidth = 1;
            this.context!.strokeStyle = 'lightgray';
            this.context?.moveTo(startX, startY);

            this.context?.lineTo(startX + 300, startY - 200);
            this.context?.lineTo(startX + 200, startY - 400);
            this.context?.lineTo(startX, startY - 250);

            this.context?.lineTo(startX - 200, startY - 400);
            this.context?.lineTo(startX - 300, startY - 200);
            this.context?.lineTo(startX, startY);
            this.context!.lineWidth = 0.5;
            this.context!.stroke();
            this.context?.closePath();
        };
        drawBezierPoints();
        const anim = new AnimationCore();

        this.context?.beginPath();
        this.context!.lineWidth = 5;
        this.context!.strokeStyle = 'rgb(247, 2, 11)';
        this.context?.moveTo(startX, startY);

        const process = () => {
            let x: any, y: any;
            if (time <= 1) {
                x =
                    Math.pow(1 - time, 3) * startX +
                    3 * Math.pow(1 - time, 2) * time * (startX + 300) +
                    3 * (1 - time) * Math.pow(time, 2) * (startX + 200) +
                    Math.pow(time, 3) * startX;
                y =
                    Math.pow(1 - time, 3) * startY +
                    3 * Math.pow(1 - time, 2) * time * (startY - 200) +
                    3 * (1 - time) * Math.pow(time, 2) * (startY - 400) +
                    Math.pow(time, 3) * (startY - 250);

                time += 0.005;
            } else if (time > 1 && time1 <= 1) {
                x =
                    Math.pow(1 - time1, 3) * startX +
                    3 * Math.pow(1 - time1, 2) * time1 * (startX - 200) +
                    3 * (1 - time1) * Math.pow(time1, 2) * (startX - 300) +
                    Math.pow(time1, 3) * startX;
                y =
                    Math.pow(1 - time1, 3) * (startY - 250) +
                    3 * Math.pow(1 - time1, 2) * time1 * (startY - 400) +
                    3 * (1 - time1) * Math.pow(time1, 2) * (startY - 200) +
                    Math.pow(time1, 3) * startY;

                // let x = Math.pow(1 - time1, 3) * (w / 2) + 3 * Math.pow(1 - time1, 2) * time1 * (w / 2 - 300) + 3 * (1 - time1) * Math.pow(time1, 2) * (w / 2 - 200) + Math.pow(time1, 3) * (w / 2);
                // let y = Math.pow(1 - time1, 3) * (h / 1.5) + 3 * Math.pow(1 - time1, 2) * time1 * (h / 1.5 - 200) + 3 * (1 - time1) * Math.pow(time1, 2) * (h / 1.5 - 400) + Math.pow(time1, 3) * (h / 1.5 - 270);

                this.context!.strokeStyle = 'rgb(43, 221, 224)';

                time1 += 0.005;
            }

            this.context?.lineTo(Math.floor(x), Math.floor(y));
            this.context!.stroke();

            if (time1 > 1) {
                this.context?.clearRect(0, 0, w, h);

                time = time1 = 0;
                drawBezierPoints();
                this.context?.beginPath();
                this.context!.lineWidth = 5;
                this.context!.strokeStyle = 'rgb(247, 2, 11)';
                this.context?.moveTo(startX, startY);
                // anim.stop();
            }
        };

        anim.callback = () => {
            process();
        };
        anim.start();
    }
}
