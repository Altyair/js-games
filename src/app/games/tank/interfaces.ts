import { TankBullet } from './objects/TankBullet';
import { Tank } from './objects/Tank';
import { Bomb } from './objects/Bomb';

export interface DirectionKeydown {
    direction?: string;
    value?: number;
}
export type Object = TankBullet[] | Tank | Bomb[];
export type Objects = [Object?, Object?, Object?];
