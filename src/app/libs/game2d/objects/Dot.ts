import { Helper } from '../Helper';

const CONFIG = {
    dotMinRad: 6,
    dotMaxRad: 20,
    massFactor: 0.002,
    defColor: 'rgb(207, 115, 217)',
};
const TWO_PI = 2 * Math.PI;
export default class Dot {
    private context: any;
    public pos: any;
    public vel: any;
    public rad: number;
    public mass: number;
    public color: string;
    public lifeTime?: number;
    public startAnimTime?: number;
    constructor(
        mouse: { x: any; y: any },
        context: any,
        r?: number,
        vel?: { x: any; y: any },
        lifeTime?: number,
        startAnimTime?: number,
        color?: string
    ) {
        this.context = context;
        this.pos = { x: mouse.x, y: mouse.y };
        this.vel = vel || { x: 0, y: 0 };
        this.rad = r || Helper.randomValue(CONFIG.dotMinRad, CONFIG.dotMaxRad);
        this.mass = this.rad * CONFIG.massFactor;
        this.color = color || CONFIG.defColor;
        this.lifeTime = lifeTime;
        this.startAnimTime = startAnimTime;
    }

    draw(options?: any) {
        this.pos.x = options?.x || this.pos.x + this.vel.x;
        this.pos.y = options?.y || this.pos.y + this.vel.y;
        this._createCircle(this.pos.x, this.pos.y, this.rad, true, this.color);
        if (options?.withBorder) {
            this._createCircle(this.pos.x, this.pos.y, this.rad, false, CONFIG.defColor);
        }
    }

    private _createCircle(x: number, y: number, rad: number, fill: boolean, color: string): void {
        this.context.fillStyle = this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, rad, 0, TWO_PI);
        this.context.closePath();
        fill ? this.context.fill() : this.context.stroke();
    }
}
