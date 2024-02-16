type IPlane = { x: number; y: number; x1: number; y1: number; angl?: number };

export default class Plane {
    context: any;
    x: number;
    y: number;
    size: number;
    lineWidth: number;
    strokeStyle: number;
    angl: number;
    side: IPlane | undefined;

    constructor(context: any, options?: any) {
        this.context = context;
        this.x = options?.x || 50;
        this.y = options?.y || 50;
        this.size = options?.size / 2 || 200;
        this.strokeStyle = options?.strokeStyle || 'red';
        this.lineWidth = options?.lineWidth || 0.5;
        this.angl = options.angl || 0;

        this.create();
    }

    public create() {
        this.context.beginPath();
        this.context.strokeStyle = this.strokeStyle;
        this.context.lineWidth = 1;

        const xmov = this.size * Math.cos(((this.angl + 90) * Math.PI) / 180);
        const ymov = Math.sin(((this.angl + 90) * Math.PI) / 180) * this.size;

        const xmov1 = this.size * Math.cos((this.angl * Math.PI) / 180);
        const ymov1 = Math.sin((this.angl * Math.PI) / 180) * this.size;

        this.side = { x: this.x + xmov, y: this.y + ymov, x1: this.x + xmov1, y1: this.y + ymov1 };
        this.side.angl = Math.atan2(this.side.y1 - this.side.y, this.side.x1 - this.side.x);

        this.context?.beginPath();
        this.context!.moveTo(this.side.x, this.side.y);
        this.context!.lineTo(this.side.x1, this.side.y1);
        this.context!.stroke();
        this.context.closePath();
    }
}
