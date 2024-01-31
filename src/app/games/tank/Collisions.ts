import { Bomb } from './objects/Bomb';
import { TankBullet } from './objects/TankBullet';
import { Helper } from '../shared/Helper';
import { Tank } from './objects/Tank';
import { Coordinates, DirectionKeydown } from './interfaces';
import { State } from './State';
import { Subject } from 'rxjs';

export class Collisions {
    public static gameOverObs$ = new Subject<boolean>();

    static checkCollisions(bombs: Bomb[], bullets: TankBullet[], tank: Tank): void {
        Collisions.checkBombWithBullet(bombs, bullets);
        Collisions.checkBombWithTank(bombs, tank);
    }

    static checkBombWithTank(bombs: Bomb[], tank: Tank): void {
        bombs.some((bomb: Bomb, index) => {
            if (!bomb.destroyed && Helper.isSame(bomb.coordinates, tank.coordinates)) {
                Collisions.gameOverObs$.next(true);
            }
        });
    }

    static checkBombWithBullet(bombs: Bomb[], bullets: TankBullet[]): void {
        bullets
            .filter((bullet: TankBullet, index) => bullet.isFlying)
            .some((bullet: TankBullet, index) => {
                const foundIndex = bombs.findIndex(
                    (bomb: Bomb) =>
                        !bomb.destroyed && !bullet.destroyed && Helper.isSame(bullet.coordinates, bomb.coordinates)
                );
                if (foundIndex !== -1) {
                    // bombs[foundIndex].destroyed = true;
                    bombs[foundIndex].coordinates = [0, Helper.randomValue(0, State.config.mapSize! - 1)];
                    bullet.destroyed = true;
                }
            });
    }

    static checkTankWithBorders(tank: Tank, direction: DirectionKeydown): boolean {
        const nextCoordinates: Coordinates = tank.getNextCoordinates(direction);
        return (
            nextCoordinates[1] >= 0 &&
            nextCoordinates[1] < State.config.mapSize! - 1 &&
            nextCoordinates[0] >= 0 &&
            nextCoordinates[0] <= State.config.mapSize! - 1
        );
    }
}
