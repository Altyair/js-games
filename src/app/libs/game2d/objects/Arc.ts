export default class Arc {
    context: any;
    x: number;
    y: number;
    radius: number;
    xmov: number;
    ymov: number;
    vectorByFrame: { xmov: number; ymov: number } | undefined;
    lineWidth: number;
    strokeStyle: number;
    fillStyle: number;
    startAngle: number;
    endAngle: number;
    anticlockwise: boolean;

    constructor(context: any, options: any) {
        this.context = context;
        this.x = options.x || 50;
        this.y = options.y || 50;
        this.radius = options.radius || 20;

        this.xmov = options.xmov || 0;
        this.ymov = options.ymov || 0;
        this.lineWidth = options.lineWidth || 1;
        this.strokeStyle = options.strokeStyle || 'red';
        this.fillStyle = options.fillStyle || 'red';

        this.startAngle = options.startAngle || 0;
        this.endAngle = options.endAngle || Math.PI * 2;
        this.anticlockwise = options.anticlockwise || false;

        this.create();
    }

    public move(): void {
        if (this.vectorByFrame) {
            this.x += this.vectorByFrame.xmov;
            this.y += this.vectorByFrame.ymov;
            this.create();
            this.vectorByFrame = undefined;
            return;
        }
        this.x += this.xmov;
        this.y += this.ymov;
        this.create();
    }

    public create() {
        this.context.strokeStyle = this.strokeStyle;
        this.context.fillStyle = this.fillStyle;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
        this.context.lineWidth = this.lineWidth;
        this.context.stroke();
        this.context.closePath();
    }
}
