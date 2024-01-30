import { ElementRef } from '@angular/core';
import { Tank } from './objects/Tank';
import { Bomb } from './objects/Bomb';
import { TankBullet } from './objects/TankBullet';
import { Objects } from './interfaces';

export class Map {
    static readonly template =
        '<div style="display: inline-block; margin: 1px; width: 10px; height: 10px; background-color: white"></div>';

    public size: number = 20;
    public map: any = [];
    container: any;

    constructor(size: number, container: ElementRef<HTMLElement> | undefined) {
        this.size = size;
        this.container = container;
        this.clear();
    }

    public clear(): void {
        this.map = [];
        for (let i = 0; i < this.size; i++) {
            this.map.push([]);
            for (let j: number = 0; j < this.size; j++) {
                j === this.size - 1 ? this.map[i].push('<br>') : this.map[i].push(Map.template);
            }
        }
    }

    public draw(): void {
        let htmlScheme = '';
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map.length; j++) {
                htmlScheme += this.map[i][j];
            }
        }
        this.container.nativeElement.innerHTML = htmlScheme;
        this.container.nativeElement.style.border = '1px solid black';
        this.container.nativeElement.style.width = 'fit-content';
        this.container.nativeElement.style.margin = '0 auto';
    }

    private putObject(object: Tank | Bomb | TankBullet): void {
        if (!object.destroyed!) {
            this.map[object.coordinates[0]][object.coordinates[1]] = object.template;
        }
    }

    public placeObjects(objects: Objects): void {
        objects.forEach((object: any) => {
            if (object?.length) {
                object?.forEach((obj: any) => {
                    this.putObject(obj);
                });
            } else {
                this.putObject(object);
            }
        });
    }
}
