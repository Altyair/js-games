import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Game } from '../games/tank/Game';

@Component({
    selector: 'test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss'],
})
export class TestComponent implements AfterViewInit {
    @ViewChild('app', { static: false }) app: ElementRef<HTMLElement> | undefined;

    ngAfterViewInit(): void {
        const game: Game = new Game(this.app, {

        });
        game.play();
    }
}
