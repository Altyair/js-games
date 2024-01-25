import { Helper } from '../../shared/Helper';

export class Bomb {
    public readonly template =
        '<span style="display: inline-block; margin: 1px; width: 10px; height: 10px; background-color: red"></span>';
    coordinates: [number, number] = [0, Helper.randomValue(0, 19)];
    destroyed: boolean = false;
    move(coordinates: [number, number]) {
        this.coordinates = coordinates;
    }
}
