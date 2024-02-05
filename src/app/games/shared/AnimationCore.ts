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
        const tick = () => {
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
