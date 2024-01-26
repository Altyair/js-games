import { ElementRef } from '@angular/core';
import { Tank } from './objects/Tank';
import { Bomb } from './objects/Bomb';
import { TankBullet } from './objects/TankBullet';
import { Objects } from './interfaces';

export class Scheme {
    static readonly template =
        '<span style="display: inline-block; margin: 1px; width: 10px; height: 10px; background-color: lightgray"></span>';

    public size: number = 20;
    public scheme: any = [];
    container: any;

    constructor(size: number, container: ElementRef<HTMLElement> | undefined) {
        this.size = size;
        this.container = container;
        this.clear();
    }

    public clear(): void {
        this.scheme = [];
        for (let i = 0; i < this.size; i++) {
            this.scheme.push([]);
            for (let j: number = 0; j < this.size; j++) {
                j === this.size - 1 ? this.scheme[i].push('<br>') : this.scheme[i].push(Scheme.template);
            }
        }
    }

    public draw(): void {
        let htmlScheme = '';
        for (let i = 0; i < this.scheme.length; i++) {
            for (let j = 0; j < this.scheme.length; j++) {
                htmlScheme += this.scheme[i][j];
            }
        }
        this.container.nativeElement.innerHTML = htmlScheme;
        this.container.nativeElement.style.border = '1px solid black';
        this.container.nativeElement.style.width = 'fit-content';
        this.container.nativeElement.style.margin = '0 auto';
    }

    private putObject(object: Tank | Bomb | TankBullet): void {
        if (!object.destroyed!) {
            this.scheme[object.coordinates[0]][object.coordinates[1]] = object.template;
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
