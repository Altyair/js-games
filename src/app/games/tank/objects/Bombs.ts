import { Bomb } from './Bomb';

export class Bombs {
    items: Bomb[] = [];
    private readonly countBombs: number = 0;

    constructor(countBullets: number) {
        this.countBombs = countBullets;
        this.createBullets();
    }

    private createBullets(): void {
        for (let i = 0; i < this.countBombs; i++) {
            this.items.push(new Bomb());
        }
    }

    public resetItems(): void {
        this.items = [];
    }
}
