import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import AnimationCore from '../../libs/game2d/AnimationCore';
import { Helper } from '../../libs/game2d/Helper';
import Geometry from '../../libs/game2d/Geometry';

import { ISide } from '../../libs/game2d/interfaces';

class Line {
    context: any;
    x: number;
    y: number;
    size: number;
    lineWidth: number;
    strokeStyle: number;
    angl: number;
    side!: ISide;
    public lifeTime?: number;
    public startAnimTime?: number;
    vel!: any | undefined;
    speedK!: any;
    firstLaunch: boolean = true;
    alpha: number = 1;

    constructor(context: any, options?: any) {
        this.context = context;
        this.x = options?.x || 50;
        this.y = options?.y || 50;
        this.size = options?.size / 2 || 200;
        this.strokeStyle = options?.strokeStyle || 'white';
        this.lineWidth = options?.lineWidth || 0.5;
        this.angl = options.angl || 0;
        this.lifeTime = options?.lifeTime;
        this.startAnimTime = options?.startAnimTime;
        this.speedK = options?.speedK || { x: 10, y: 5 };
        // this.create();
    }

    move() {
        this.vel = {
            x: this.size * Math.cos((this.angl * Math.PI) / 180),
            y: Math.sin((this.angl * Math.PI) / 180) * this.size,
        };

        this.x += this.vel.x / this.speedK.x;
        this.y += this.vel.y / this.speedK.y;
    }

    public create() {
        this.side = { x: this.x, y: this.y, x1: this.x + this.vel.x, y1: this.y + this.vel.y };
        this.side.angl = Math.atan2(this.side.y1 - this.side.y, this.side.x1 - this.side.x);

        this.context.beginPath();
        this.context.strokeStyle = this.strokeStyle;
        this.context.lineWidth = 2;
        this.context!.moveTo(this.side.x, this.side.y);
        this.context!.lineTo(this.side.x1, this.side.y1);
        this.context!.stroke();
        this.context.closePath();
    }
}


@Component({
    selector: 'canvas3-test',
    templateUrl: './canvas-3.component.html',
    styleUrls: ['./canvas-3.component.scss'],
})
export class Canvas3Component implements AfterViewInit, OnDestroy {
    @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement> | undefined;
    public context: CanvasRenderingContext2D | null | undefined;
    private anim: any;

    ngAfterViewInit(): void {
        this.context = this.canvas!.nativeElement.getContext('2d');

        // set config
        // const config: { timeValue: number; lineType: 'solid' | 'arc' } = {
        //     timeValue: 0.001,
        //     lineType: 'arc',
        // };

        // init variables
        let w: number = (this.canvas!.nativeElement.width = innerWidth),
            h: number = (this.canvas!.nativeElement.height = innerHeight),
            angl: number = 0;

        const particles: any = [];
        const createParticle = () => {
            const x = Helper.randomValue(w / 2, w / 2);
            const y = Helper.randomValue(h / 2, h / 2);

            const velY = Helper.randomValue(10, 30);
            // const angl = Helper.randomValue(140, 200);
            const len = Geometry.getLen({ velX: 0, velY });

            angl += 0.01;
            particles.push(
                new Line(this.context, {
                    x,
                    y,
                    size: len,
                    angl,
                    lifeTime: Helper.randomValue(400, 5200),
                    startAnimTime: new Date().getTime() + Helper.randomValue(100, 300),
                    strokeStyle: `rgb(226, 88, 34, 1)`,
                    speedK: { x: 5, y: 7 },
                })
            );
        };

        const init = () => {
            for (let i = 0; i < 5000; i++) {
                createParticle();
            }
            console.log(particles);
        };

        const process = () => {
            for (let i = 0; i < particles.length; i++) {
                const el = particles[i];
                if (new Date().getTime() - el.startAnimTime >= el.lifeTime) {
                    particles.splice(i, 1);
                    createParticle();
                }

                const alpha = Math.abs((new Date().getTime() - el.startAnimTime) / el.lifeTime - 1);

                el.alpha -= 0.001;
                el.strokeStyle = `rgb(226, 88, 34, ${el.alpha})`;

                el.size -= 0.005;
                el.speedK.y -= 0.00005;
                el.angl += Helper.randomValue(-3, 3);

                if (el.firstLaunch) {
                    if (new Date().getTime() >= el.startAnimTime) {
                        el.move();
                        el.create();
                        el.firstLaunch = false;
                    }
                } else {
                    el.move();
                    el.create();
                }
            }
        };
        init();

        // run animation process
        this.anim = new AnimationCore();
        this.anim.callback = () => {
            this.context?.clearRect(0, 0, w, h);

            process();
        };
        this.anim.start();
    }

    ngOnDestroy(): void {
        this.anim.stop();
    }
}
