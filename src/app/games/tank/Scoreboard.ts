import { Subject } from 'rxjs';
import { State } from './State';

export class Scoreboard {
    public static isChangedScore$ = new Subject<boolean>();

    static getTemplate(): string {
        return `<div style="font-size: 25px">
                    <p>Score: ${State.score}</p>
                    <p>Level: 0</p>
                </div>`;
    }
}
