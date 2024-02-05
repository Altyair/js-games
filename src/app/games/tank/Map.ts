import { ElementRef } from '@angular/core';
import { Tank } from './objects/Tank';
import { Bomb } from './objects/Bomb';
import { TankBullet } from './objects/TankBullet';
import { Objects } from './interfaces';
import { State } from './State';
import { Scoreboard } from "./Scoreboard";

export class Map {
    private readonly template = `<div style="display: inline-block; margin: 1px; width: ${State.config.objectSize}px; height: ${State.config.objectSize}px; background-color: lightcyan"></div>`;

    public size: number | null = null;
    public map: any = [];
    container: ElementRef<HTMLElement> | undefined;
    private _htmlScheme: string = '';

    constructor(size: number, container: ElementRef<HTMLElement> | undefined) {
        this.size = size;
        this.container = container;
        this.clear();
    }

    public clear(): void {
        this.map = [];
        for (let i = 0; i < this.size!; i++) {
            this.map.push([]);
            for (let j: number = 0; j < this.size!; j++) {
                j === this.size! - 1 ? this.map[i].push('<br>') : this.map[i].push(this.template);
            }
        }
    }

    private _drawMap(): void {
        this._htmlScheme += '<div id="map">';
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map.length; j++) {
                this._htmlScheme += this.map[i][j];
            }
        }
        this._htmlScheme += '</div>';
        this.container!.nativeElement.innerHTML = this._htmlScheme;
        // this.container!.nativeElement.style.border = '1px solid black';
        // this.container!.nativeElement.style.width = 'fit-content';
        // this.container!.nativeElement.style.margin = '0 auto';
    }

    private _drawScore(): void {
        this._htmlScheme = Scoreboard.getTemplate();
    }

    public draw(): void {
        this._drawScore();
        this._drawMap();
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
