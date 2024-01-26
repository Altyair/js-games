import { Bomb } from './objects/Bomb';
import { TankBullet } from './objects/TankBullet';
import { Helper } from '../shared/Helper';

export class Collisions {
    static checkCollisionsBombWithBullet(bombs: Bomb[], bullets: TankBullet[]): void {
        bullets.some((bullet: TankBullet, index) => {
            const foundIndex = bombs.findIndex(
                (bomb: Bomb) =>
                    !bomb.destroyed && !bullet.destroyed && Helper.isSame(bullet.coordinates, bomb.coordinates)
            );
            if (foundIndex !== -1) {
                bombs[foundIndex].destroyed = true;
                bullet.destroyed = true;
            }
        });
    }
}
