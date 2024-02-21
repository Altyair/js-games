import { Helper } from '../../../libs/game2d/Helper';
import { State } from '../State';

export class Bomb {
    public readonly template = `<span style="display: inline-block; margin: 1px; width: ${State.config.objectSize}px; height: ${State.config.objectSize}px; background-color: red"></span>`;
    coordinates: [number, number] = [0, Helper.randomValue(0, State.config.mapSize! - 1)];
    destroyed: boolean = false;
    move(coordinates: [number, number]) {
        this.coordinates = coordinates;
    }
}
