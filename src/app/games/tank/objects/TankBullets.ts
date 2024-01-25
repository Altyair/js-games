import { TankBullet } from './TankBullet';

export class TankBullets {
    items: TankBullet[] = [];
    private readonly countBullets: number = 0;

    constructor(countBullets: number) {
        this.countBullets = countBullets;
        this.createBullets();
    }

    private createBullets(): void {
        for (let i = 0; i < this.countBullets; i++) {
            this.items.push(new TankBullet());
        }
    }

    public resetItems(): void {
        this.items = [];
    }
}
