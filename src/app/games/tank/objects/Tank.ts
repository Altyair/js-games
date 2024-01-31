import { State } from '../State';
import { Coordinates } from '../interfaces';

export class Tank {
    public template =
        '<span style="display: inline-block; margin: 1px; width: 10px; height: 10px; background-color: black"></span>';
    coordinates: Coordinates = [State.config.mapSize! - 1, 14];
    destroyed: boolean = false;

    constructor() {}

    moveByDirection(data: { direction?: string; value?: number }) {
        this.coordinates = this.getNextCoordinates(data);
    }

    getNextCoordinates(data: { direction?: string; value?: number }): Coordinates {
        const { direction, value } = data;

        if (direction === 'left') {
            return [this.coordinates[0], this.coordinates[1] - value!];
        } else if (direction === 'right') {
            return [this.coordinates[0], this.coordinates[1] + value!];
        } else if (direction === 'top') {
            return [this.coordinates[0] - value!, this.coordinates[1]];
        } else if (direction === 'down') {
            return [this.coordinates[0] + value!, this.coordinates[1]];
        }
        return [0, 0];
    }
}
