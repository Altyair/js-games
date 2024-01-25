import { Bomb } from './Bomb';

export class Bombs {
    items: Bomb[] = [];
    private readonly countBullets: number = 0;

    constructor(countBullets: number) {
        this.countBullets = countBullets;
        this.createBullets();
    }

    private createBullets(): void {
        for (let i = 0; i < this.countBullets; i++) {
            this.items.push(new Bomb());
        }
    }

    public resetItems(): void {
        this.items = [];
    }
}
