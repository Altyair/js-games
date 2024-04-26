import { ISide } from '../interfaces';

export default class Line1 {
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
    vel: any | undefined = { x: 0, y: 0 };
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
