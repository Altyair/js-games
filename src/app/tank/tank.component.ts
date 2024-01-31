import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Game } from '../games/tank/Game';

@Component({
    selector: 'tank',
    templateUrl: './tank.component.html',
    styleUrls: ['./tank.component.scss'],
})
export class TankComponent implements AfterViewInit {
    @ViewChild('app', { static: false }) app: ElementRef<HTMLElement> | undefined;

    ngAfterViewInit(): void {
        const game: Game = new Game(this.app, {
            mapSize: 30,
            countBombs: 15,
            countBullets: 30,
            bombSpeed: 300,
            bulletSpeed: 50,
        });
        game.play();
    }
}
