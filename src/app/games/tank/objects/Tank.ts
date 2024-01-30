import { State } from '../State';

export class Tank {
    public template =
        '<span style="display: inline-block; margin: 1px; width: 10px; height: 10px; background-color: black"></span>';
    coordinates: [number, number] = [19, 14];
    destroyed: boolean = false;

    constructor() {}

    moveByDirection(data: { direction?: string; value?: number }) {
        const { direction, value } = data;

        if (direction === 'left') {
            this.coordinates = [this.coordinates[0], this.coordinates[1] - value!];
        } else if (direction === 'right') {
            this.coordinates = [this.coordinates[0], this.coordinates[1] + value!];
        } else if (direction === 'top') {
            this.coordinates = [this.coordinates[0] - value!, this.coordinates[1]];
        } else if (direction === 'down') {
            this.coordinates = [this.coordinates[0] + value!, this.coordinates[1]];
        }
    }
}
