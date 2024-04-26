import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import AnimationCore from '../../libs/game2d/AnimationCore';
import { Helper } from '../../libs/game2d/Helper';
import Geometry from '../../libs/game2d/Geometry';
import Line1 from '../../libs/game2d/objects/Line1';

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
        const config: any = {
            timeValue: 0.001,
            lineType: 'arc',
        };

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
                new Line1(this.context, {
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
