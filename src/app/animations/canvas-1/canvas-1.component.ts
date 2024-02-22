import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import AnimationCore from '../../libs/game2d/AnimationCore';
import Dot from '../../libs/game2d/objects/Dot';

@Component({
    selector: 'canvas1-test',
    templateUrl: './canvas-1.component.html',
    styleUrls: ['./canvas-1.component.scss'],
})
export class Canvas1Component implements AfterViewInit {
    @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement> | undefined;
    public context: CanvasRenderingContext2D | null | undefined;

    ngAfterViewInit(): void {
        this.context = this.canvas!.nativeElement.getContext('2d');
        this.canvas!.nativeElement.style.cursor = 'none';

        const config: any = {
            smooth: 0.65,
            sphereRad: 300,
            bigDotRad: 35,
            mouseSize: 120,
        };
        let w: number, h: number, mouse: any, dots: Dot[];

        const init = () => {
            w = this.canvas!.nativeElement.width = innerWidth;
            h = this.canvas!.nativeElement.height = innerHeight;

            mouse = { x: w / 2, y: h / 2, down: false };
            dots = [];

            dots.push(new Dot(mouse, this.context, config.bigDotRad));
        };

        init();

        function setPos({ layerX, layerY }: any) {
            [mouse.x, mouse.y] = [layerX, layerY];
            console.log(mouse);
        }
        this.canvas!.nativeElement.addEventListener('mousemove', setPos);

        function isDown() {
            mouse.down = !mouse.down;
        }
        this.canvas!.nativeElement.addEventListener('mousedown', isDown);
        this.canvas!.nativeElement.addEventListener('mouseup', isDown);

        function updateDots() {
            for (let i = 1; i < dots.length; i++) {
                let acc = { x: 0, y: 0 };
                for (let j = 0; j < dots.length; j++) {
                    if (i === j) {
                        continue;
                    }
                    const [a, b] = [dots[i], dots[j]];

                    const delta = { x: b.pos.x - a.pos.x, y: b.pos.y - a.pos.y };
                    let dist = Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2)) || 1;
                    let force = (dist - config.sphereRad) / dist * b.mass;

                    if (j === 0) {
                        const alpha = config.mouseSize / dist;
                        a.color = `rgb(207, 115, 217, ${alpha})`;
                        dist < config.mouseSize ? ((dist - config.mouseSize) / dist) * b.mass : (force = a.mass);
                    }

                    acc.x += delta.x * force;
                    acc.y += delta.y * force;
                }
                dots[i].vel.x = dots[i].vel.x * config.smooth + acc.x * dots[i].mass;
                dots[i].vel.y = dots[i].vel.y * config.smooth + acc.y * dots[i].mass;
            }
        }

        const anim = new AnimationCore();
        anim.callback = () => {
            this.context?.clearRect(0, 0, w, h);

            if (mouse.down) {
                dots.push(new Dot(mouse, this.context));
            }
            updateDots();
            dots.map((e) => (e === dots[0] ? e.draw(mouse.x, mouse.y) : e.draw()));
        };
        anim.start();
    }
}
