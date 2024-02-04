export class Scoreboard {
    static readonly template = '' + '<div style="width: 300px; height: 150px">' + '<p>Score: 0</p>' + '</div>';
    private _score: number = 0;
    constructor() {}

    get score(): number {
        return this._score;
    }
}
