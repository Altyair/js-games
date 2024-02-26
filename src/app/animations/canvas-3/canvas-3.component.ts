import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
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

        this.create();
    }

    move() {
        this.x += this.vel.x / this.speedK.x;
        this.y += this.vel.y / this.speedK.y;
    }

    public create() {
        this.vel = {
            x: this.size * Math.cos((this.angl * Math.PI) / 180),
            y: Math.sin((this.angl * Math.PI) / 180) * this.size,
        };

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
export class Canvas3Component implements AfterViewInit {
    @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement> | undefined;
    public context: CanvasRenderingContext2D | null | undefined;

    ngAfterViewInit(): void {
        this.context = this.canvas!.nativeElement.getContext('2d');

        // set config
        // const config: { timeValue: number; lineType: 'solid' | 'arc' } = {
        //     timeValue: 0.001,
        //     lineType: 'arc',
        // };

        // init variables
        let w: number = (this.canvas!.nativeElement.width = innerWidth),
            h: number = (this.canvas!.nativeElement.height = innerHeight);

        const particles: any = [];
        const createParticle = () => {
            const x = Helper.randomValue(w / 2, w / 2);
            const y = Helper.randomValue(h / 2, h / 2);

            const velY = Helper.randomValue(30, 100);
            const angl = Helper.randomValue(160, 180);
            const len = Geometry.getLen({ velX: 0, velY });

            particles.push(
                new Line(this.context, {
                    x,
                    y,
                    size: len,
                    angl,
                    lifeTime: Helper.randomValue(400, 2500),
                    startAnimTime: new Date().getTime(),
                    strokeStyle: `rgb(226, 88, 34, 1)`,
                    speedK: { x: 5, y: 7 },
                })
            );
        };

        const init1 = () => {
            for (let i = 0; i < 500; i++) {
                createParticle();
            }
        };

        const process = () => {
            for (let i = 0; i < particles.length; i++) {
                const el = particles[i];
                if (new Date().getTime() - el.startAnimTime >= el.lifeTime) {
                    particles.splice(i, 1);
                    createParticle();
                }

                const alpha = Math.abs((new Date().getTime() - el.startAnimTime) / el.lifeTime - 1);
                el.strokeStyle = `rgb(226, 88, 34, ${alpha - 0.3})`;
                if (alpha < 0.8) {
                    el.angl += Helper.randomValue(-2, 3);
                    el.speedK.y = 3;
                }

                el.move();
                el.create();
            }
        };
        init1();
        process();

        // run animation process
        const anim = new AnimationCore();
        anim.callback = () => {
            this.context?.clearRect(0, 0, w, h);

            process();
        };
        anim.start();
    }
}
