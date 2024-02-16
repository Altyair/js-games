type ISide = { x: number; y: number; x1: number; y1: number; angl?: number };

export default class Square {
    context: any;
    x: number;
    y: number;
    size: number;
    lineWidth: number;
    strokeStyle: number;
    angl: number;
    sides: ISide[] = [];

    constructor(context: any, options?: any) {
        this.context = context;
        this.x = options?.x || 50;
        this.y = options?.y || 50;
        this.size = options?.size || 200;
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

        this.sides = [
            { x: this.x + xmov, y: this.y + ymov, x1: this.x + xmov1, y1: this.y + ymov1 },
            { x: this.x + xmov1, y: this.y + ymov1, x1: this.x - xmov, y1: this.y - ymov },
            { x: this.x - xmov, y: this.y - ymov, x1: this.x - xmov1, y1: this.y - ymov1 },
            { x: this.x - xmov1, y: this.y - ymov1, x1: this.x + xmov, y1: this.y + ymov },
        ];

        // this.sides = [
        //     { x: Math.round(this.x + xmov), y: Math.round(this.y + ymov), x1: Math.round(this.x + xmov1), y1: Math.round(this.y + ymov1) },
        //     { x: Math.round(this.x + xmov1), y: Math.round(this.y + ymov1), x1: Math.round(this.x - xmov), y1: Math.round(this.y - ymov) },
        //     { x: Math.round(this.x - xmov), y: Math.round(this.y - ymov), x1: Math.round(this.x - xmov1), y1: Math.round(this.y - ymov1) },
        //     { x: Math.round(this.x - xmov1), y: Math.round(this.y - ymov1), x1: Math.round(this.x + xmov), y1: Math.round(this.y + ymov) },
        // ];

        this.sides.forEach((side: ISide) => {
            side.angl = Math.atan2(side.y1 - side.y, side.x1 - side.x);
        });

        this.context?.beginPath();
        this.context!.moveTo(this.sides[0].x, this.sides[0].y);
        this.context!.lineTo(this.sides[0].x1, this.sides[0].y1);
        this.context!.lineTo(this.sides[1].x1, this.sides[1].y1);
        this.context!.lineTo(this.sides[2].x1, this.sides[2].y1);
        this.context!.lineTo(this.sides[3].x1, this.sides[3].y1);
        this.context!.stroke();
        this.context.closePath();
    }
}
