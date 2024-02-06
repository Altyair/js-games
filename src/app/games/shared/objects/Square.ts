interface ILines {
    x: number;
    y: number;
    deg: number;
}

export default class Square {
    context: any;
    x: number;
    y: number;
    size: number;
    lineWidth: number;
    strokeStyle: number;
    angl: number = 0;

    constructor(context: any, options?: any) {
        this.context = context;
        this.x = options?.x || 50;
        this.y = options?.y || 50;
        this.size = options?.size || 200;
        this.strokeStyle = options?.strokeStyle || 'red';
        this.lineWidth = options?.lineWidth || 0.5;

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

        this.context?.beginPath();
        this.context!.moveTo(this.x + xmov, this.y + ymov);
        this.context!.lineTo(this.x + xmov1, this.y + ymov1);
        this.context!.lineTo(this.x - xmov, this.y - ymov);
        this.context!.lineTo(this.x - xmov1, this.y - ymov1);
        this.context!.lineTo(this.x + xmov, this.y + ymov);
        this.context!.stroke();
        this.context.closePath();
    }
}
