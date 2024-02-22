import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import AnimationCore from '../../libs/game2d/AnimationCore';
import Arc from '../../libs/game2d/objects/Arc';

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

        // set config
        const config: any = {
            timeValue: 0.003,
        };

        // init variables
        let w: number = (this.canvas!.nativeElement.width = innerWidth),
            h: number = (this.canvas!.nativeElement.height = innerHeight),
            mouse: any,
            time: number = 0,
            time1: number = 0;

        // start coords
        const startX = w! / 2;
        const startY = h! / 1.5

        console.log(startX, startY);

        // bezier points data
        const bezierPoints = [
            [
                [startX, startY],
                [startX + 250, startY - 200],
                [startX + 200, startY - 400],
                [startX, startY - 250],
            ],
            [
                [startX, startY - 250],
                [startX - 200, startY - 400],
                [startX - 250, startY - 200],
                [startX, startY],
            ],
        ];

        // draw bezier area with points
        const drawBezierPoints = () => {
            this.context?.beginPath();
            this.context!.lineWidth = 1;
            this.context!.strokeStyle = 'lightgray';
            this.context?.moveTo(bezierPoints[0][0][0], bezierPoints[0][0][1]);
            for (let i = 0; i < bezierPoints.length; i++) {
                for (let j = 0; j < bezierPoints[i].length; j++) {
                    if (j === 0) {
                        continue;
                    }
                    this.context?.lineTo(bezierPoints[i][j][0], bezierPoints[i][j][1]);
                }
            }
            this.context!.lineWidth = 0.5;
            this.context!.stroke();
            this.context?.closePath();

            for (let i = 0; i < bezierPoints.length; i++) {
                for (let j = 0; j < bezierPoints[i].length; j++) {
                    if (j === 0) {
                        continue;
                    }
                    const arc = new Arc(this.context!, {
                        radius: 10,
                        x: bezierPoints[i][j][0],
                        y: bezierPoints[i][j][1],
                    });
                    arc.create();
                }
            }
        };

        // set default state
        const setDefault = () => {
            time = time1 = 0;
            this.context?.clearRect(0, 0, w, h);
            drawBezierPoints();
            this.context?.beginPath();
            this.context!.lineWidth = 5;
            this.context!.strokeStyle = 'rgb(247, 2, 11)';
            this.context?.moveTo(bezierPoints[0][0][0], bezierPoints[0][0][1]);
        };

        // init mouse events
        const initEvents = () => {
            const mousemoveHandler = ({ layerX, layerY }: any) => {
                console.log(layerX, layerY);

                bezierPoints[0][0] = [layerX, layerY];
                bezierPoints[1][3] = [layerX, layerY];

                setDefault();
            };
            this.canvas?.nativeElement.addEventListener('mousedown', ({ layerX, layerY }: any) => {

                this.canvas?.nativeElement.addEventListener('mousemove', mousemoveHandler);
                this.canvas?.nativeElement.addEventListener('mouseup', ({ layerX, layerY }: any) => {
                    this.canvas?.nativeElement.removeEventListener('mousemove', mousemoveHandler);
                });
            });
        };

        // animation process
        const process = () => {
            let x: number, y: number;
            if (time <= 1) {
                x =
                    Math.pow(1 - time, 3) * bezierPoints[0][0][0] +
                    3 * Math.pow(1 - time, 2) * time * bezierPoints[0][1][0] +
                    3 * (1 - time) * Math.pow(time, 2) * bezierPoints[0][2][0] +
                    Math.pow(time, 3) * bezierPoints[0][0][0];
                y =
                    Math.pow(1 - time, 3) * bezierPoints[0][0][1] +
                    3 * Math.pow(1 - time, 2) * time * bezierPoints[0][1][1] +
                    3 * (1 - time) * Math.pow(time, 2) * bezierPoints[0][2][1] +
                    Math.pow(time, 3) * bezierPoints[0][3][1];

                time += config.timeValue;
            } else if (time > 1 && time1 <= 1) {
                x =
                    Math.pow(1 - time1, 3) * bezierPoints[1][0][0] +
                    3 * Math.pow(1 - time1, 2) * time1 * bezierPoints[1][1][0] +
                    3 * (1 - time1) * Math.pow(time1, 2) * bezierPoints[1][2][0] +
                    Math.pow(time1, 3) * bezierPoints[1][3][0];
                y =
                    Math.pow(1 - time1, 3) * bezierPoints[1][0][1] +
                    3 * Math.pow(1 - time1, 2) * time1 * bezierPoints[1][1][1] +
                    3 * (1 - time1) * Math.pow(time1, 2) * bezierPoints[1][2][1] +
                    Math.pow(time1, 3) * bezierPoints[1][3][1];

                time1 += config.timeValue;
            }

            this.context?.lineTo(Math.floor(x!), Math.floor(y!));
            this.context!.stroke();

            if (time > 1 && time1 === 0) {
                this.context?.clearRect(0, 0, w, h);
                drawBezierPoints();
                this.context?.beginPath();
                this.context!.lineWidth = 10;
                this.context!.strokeStyle = 'rgb(43, 221, 224)';
                this.context?.moveTo(bezierPoints[1][0][0], bezierPoints[1][0][1]);
            }

            if (time1 > 1) {
                setDefault();
            }
        };

        // call functions
        setDefault();
        initEvents();

        const anim = new AnimationCore();
        anim.callback = () => {
            process();
        };
        anim.start();
    }
}
