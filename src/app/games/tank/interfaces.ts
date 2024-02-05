import { TankBullet } from './objects/TankBullet';
import { Tank } from './objects/Tank';
import { Bomb } from './objects/Bomb';

export interface DirectionKeydown {
    direction?: string;
    value?: number;
}
export type Object = TankBullet[] | Tank | Bomb[];
export type Objects = [Object?, Object?, Object?];

export interface Config {
    mapSize?: number;
    countBombs?: number;
    countBullets?: number;
    bombSpeed?: number;
    bulletSpeed?: number;
    objectSize?: number;
}

export type Coordinates = [number, number];
export interface IState {
    config: Config;
    score?: number;
}
