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
        const config: { timeValue: number; lineType: 'solid' | 'arc' } = {
            timeValue: 0.001,
            lineType: 'arc',
        };

        // init variables
        let w: number = (this.canvas!.nativeElement.width = innerWidth),
            h: number = (this.canvas!.nativeElement.height = innerHeight),
            mouse: any,
            time: number = 0,
            time1: number = 0;

        // start coords
        const startX = 100;
        const startY = 600;

        // bezier points data
        const bezierPoints: any = [
            [
                [startX, startY],
                [startX + 450, startY - 200],
                [startX + 900, startY - 270],
                [startX + 1700, startY - 250],
            ],
            // [
            //     [startX, startY - 250],
            //     [startX - 200, startY - 400],
            //     [startX - 250, startY - 200],
            //     [startX, startY],
            // ],
            // [
            //     [startX - 70, startY - 30],
            //     [startX - 100, startY + 200],
            //     [startX - 200, startY + 300],
            //     [startX + 50, startY],
            // ],
        ];

        // draw bezier area with points
        const drawBezierPoints = () => {
            // draw lines
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

            // draw circles for points
            for (let i = 0; i < bezierPoints.length; i++) {
                for (let j = 0; j < bezierPoints[i].length; j++) {
                    // if (j === 0) {
                    //     continue;
                    // }
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
        const setDefault = (moveToX: number, moveToY: number) => {
            time = time1 = 0;
            this.context?.clearRect(0, 0, w, h);
            drawBezierPoints();
            this.context?.beginPath();
            this.context!.lineWidth = 5;
            this.context!.strokeStyle = 'rgb(247, 2, 11)';
            this.context?.moveTo(moveToX, moveToY);
        };

        // init mouse events
        const initEvents = () => {
            let editPointsIndexes: [number?, number?][] = [];
            const mousemoveHandler = ({ layerX, layerY }: any) => {
                editPointsIndexes.forEach((el: [number?, number?], i): void => {
                    bezierPoints[el[0]!][el[1]!] = [layerX, layerY];
                    setDefault(bezierPoints[0][0][0], bezierPoints[0][0][1]);
                });
            };
            this.canvas?.nativeElement.addEventListener('mousedown', ({ layerX, layerY }: any) => {
                editPointsIndexes = [];
                bezierPoints.forEach((el: [number?, number?][], i: number) => {
                    el.forEach((el1: any, j: number) => {
                        if (layerX >= el1[0] - 20 && layerX <= el1[0] + 20 && layerY >= el1[1] - 20 && layerY <= el1[1] + 20) {
                            editPointsIndexes.push([i, j]);
                        }
                    });
                });
                if (!editPointsIndexes.length) return;
                this.canvas?.nativeElement.addEventListener('mousemove', mousemoveHandler);
                this.canvas?.nativeElement.addEventListener('mouseup', ({ layerX, layerY }: any) => {
                    this.canvas?.nativeElement.removeEventListener('mousemove', mousemoveHandler);
                });
            });
        };

        // animation process
        let count: number = 0,
            timeValue: number = config.timeValue,
            figure = bezierPoints[0];
        const process = () => {
            let x: number, y: number;
            if (time <= 1) {
                x =
                    Math.pow(1 - time, 3) * figure[0][0] +
                    3 * Math.pow(1 - time, 2) * time * figure[1][0] +
                    3 * (1 - time) * Math.pow(time, 2) * figure[2][0] +
                    Math.pow(time, 3) * figure[3][0];
                y =
                    Math.pow(1 - time, 3) * figure[0][1] +
                    3 * Math.pow(1 - time, 2) * time * figure[1][1] +
                    3 * (1 - time) * Math.pow(time, 2) * figure[2][1] +
                    Math.pow(time, 3) * figure[3][1];

                // timeValue = timeValue + 0.00001;
                time += timeValue;
            }

            if (config.lineType === 'arc') {
                this.context?.clearRect(0, 0, w, h);
                drawBezierPoints();
                new Arc(this.context, { radius: 10, fill: true, x: Math.floor(x!), y: Math.floor(y!) });
            } else if (config.lineType === 'solid') {
                this.context?.lineTo(Math.floor(x!), Math.floor(y!));
                this.context!.stroke();
            }

            if (time > 1) {
                time = 0;
                timeValue = config.timeValue;
                count = bezierPoints[count + 1] ? count + 1 : 0;
                figure = bezierPoints[count];

                if (config.lineType === 'solid') {
                    setDefault(figure[0][0], figure[0][1]);
                }
            }
        };

        // call functions
        setDefault(figure[0][0], figure[0][1]);
        initEvents();

        // run animation process
        const anim = new AnimationCore();
        anim.callback = () => {
            process();
        };
        anim.start();
    }
}
