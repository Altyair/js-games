import { Subject } from 'rxjs';
import { State } from './State';

export class Scoreboard {
    public static isChangedScore$ = new Subject<boolean>();

    static getTemplate(): string {
        return `<div style="font-size: 25px">
                    <p>Score: ${State.score}&nbsp;&nbsp;&nbsp;Level: 0</p>
                </div>`;
    }
}
