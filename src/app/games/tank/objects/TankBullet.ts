import { Tank } from './Tank';
import { State } from '../State';

export class TankBullet extends Tank {
    public template =
        '<span style="display: inline-block; z-index: 1000; margin: 1px; width: 10px; height: 10px; background-color: orange"></span>';
    coordinates: [number, number] = [19, 14];
    destroyed: boolean = false;
    isFlying: boolean = false;

    constructor() {
        super();
    }

    move(coordinates: [number, number]) {
        this.coordinates = coordinates;
    }
}
