export default class AnimationCore {
    private _requestId: number | undefined;
    private _callback: any = () => {};

    get requestId(): number | undefined {
        return this._requestId;
    }

    constructor() {}

    set callback(callback: any) {
        this._callback = callback;
    }

    public start(): void {
        if (this._requestId) {
            return;
        }
        let startTimestamp = 0;
        const tick = (timestamp: number) => {
            const diff = timestamp - startTimestamp;
            startTimestamp = timestamp;
            const fps = 1000 / diff;

            this._requestId = requestAnimationFrame(tick);
            this._callback();
        };
        this._requestId = requestAnimationFrame(tick);
    }

    public stop(): void {
        if (this._requestId) {
            window.cancelAnimationFrame(this._requestId);
            this._requestId = undefined;
        }
    }
}
