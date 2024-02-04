import { Map } from './Map';
import { TankBullet } from './objects/TankBullet';
import { Tank } from './objects/Tank';
import { Bomb } from './objects/Bomb';
import { Bombs } from './objects/Bombs';
import { ElementRef } from '@angular/core';
import { TankBullets } from './objects/TankBullets';
import {
    catchError,
    concatMap,
    debounceTime,
    delayWhen,
    filter,
    from,
    fromEvent,
    interval,
    map,
    merge,
    mergeAll,
    Observable,
    of,
    scan,
    Subscription,
    takeUntil,
    tap,
    timer,
} from 'rxjs';
import { Helper } from '../shared/Helper';
import { concatAll, mergeMap, takeWhile } from 'rxjs/operators';
import { Config, DirectionKeydown, Objects } from './interfaces';
import { Collisions } from './Collisions';
import { CONFIG } from './constants';
import { State } from './State';
import { Scoreboard } from './Scoreboard';

export class Game {
    private readonly map: Map;
    private objects: Objects = [];
    private readonly bombs: Bombs | undefined;
    private readonly app: ElementRef<HTMLElement> | undefined;
    private bullets: TankBullets | undefined;
    private readonly tank: Tank | undefined;
    private moveBombs$: Observable<null | string | number> | undefined;
    private input$: Observable<DirectionKeydown> | undefined;
    private moveBullets$: Observable<number> | undefined;
    private moveTank$: Observable<TankBullet> | undefined;
    private game$: Subscription | undefined;
    private readonly scoreboard: Scoreboard;

    constructor(app: ElementRef<HTMLElement> | undefined, config: Config) {
        State.config = { ...config, ...CONFIG };
        this.scoreboard = new Scoreboard();
        this.app = app;
        this.map = new Map(State.config.mapSize!, this.app);
        this.bombs = new Bombs(State.config.countBombs!);
        this.bullets = new TankBullets(State.config.countBullets!);
        this.tank = new Tank();
        this.objects = [this.bullets.items, this.tank, this.bombs.items];

        this.initStreams();
    }

    private initStreams(): void {
        const bombsArray: Observable<string | number>[] = this.bombs!.items.map((bomb: Bomb, index: number) => {
            return interval(State.config.bombSpeed!).pipe(
                delayWhen(() => timer(index * 1000)),
                tap((_) => {
                    const coordinates = bomb.coordinates;
                    if (coordinates[0] < State.config.mapSize! - 1) {
                        bomb.move([coordinates[0] + 1, coordinates[1]]);
                    } else {
                        bomb.move([0, Helper.randomValue(0, State.config.mapSize! - 1)]);
                    }
                })
            );
        });

        this.moveBombs$ = from(bombsArray).pipe(
            mergeAll(),
            catchError((err) => of(err))
        );

        this.input$ = fromEvent(document, 'keydown', (event: any): DirectionKeydown => {
            switch (event.keyCode) {
                case 37:
                    return { direction: 'left', value: 1 };
                case 39:
                    return { direction: 'right', value: 1 };
                case 38:
                    return { direction: 'top', value: 1 };
                case 40:
                    return { direction: 'down', value: 1 };
                default:
                    return {};
            }
        });

        this.moveBullets$ = fromEvent(document, 'keyup').pipe(
            filter((event: any) => event.keyCode === 32),
            scan<number, number>((a, _) => ++a, 0),
            filter((count: number) => !!this.bullets!.items[count - 1]),
            mergeMap((val: number) => {
                const copyCoords = this.bullets!.items[val - 1].coordinates.slice();
                this.bullets!.items[val - 1].isFlying = true;
                return interval(State.config.bulletSpeed!).pipe(
                    takeWhile(() => copyCoords[0] > 0 && !this.bullets!.items[val - 1].destroyed),
                    tap((val1) => {
                        copyCoords[0] -= 1;
                        this.bullets!.items[val - 1].move([copyCoords[0], copyCoords[1]]);
                        if (copyCoords[0] === 0) {
                            this.bullets!.items[val - 1].destroyed = true;
                        }
                    })
                );
            })
        );

        this.moveTank$ = this.input$.pipe(
            map((direction: DirectionKeydown): DirectionKeydown => {
                return direction;
            }),
            filter(
                (direction: DirectionKeydown) =>
                    direction.value !== undefined && Collisions.checkTankWithBorders(this.tank!, direction)
            ),
            tap((direction: DirectionKeydown) => {
                this.tank!.moveByDirection(direction);
            }),
            concatMap((direction: DirectionKeydown): Observable<TankBullet> => {
                return from(this.bullets!.items).pipe(
                    filter((bullet: TankBullet) => !bullet.isFlying),
                    tap((bullet: TankBullet) => bullet.moveByDirection(direction))
                );
            })
        );
    }

    private update(): void {
        Collisions.checkCollisions(this.bombs?.items!, this.bullets?.items!, this.tank!);
        this.map.clear();
        this.map.placeObjects(this.objects);
        this.map.draw();
    }

    public setObjects(objects: Objects): void {
        this.objects = objects;
    }

    public play(): void {
        this.game$ = merge(this.moveBombs$!, this.moveTank$!, this.moveBullets$!)
            .pipe(takeUntil(Collisions.gameOverObs$))
            .subscribe();

        Collisions.gameOverObs$.subscribe((_) => {
            // this.bombs?.resetItems();
            // this.update();
        });

        const tick = () => {
            requestAnimationFrame(tick);
            this.update();
        };
        requestAnimationFrame(tick);
    }

    public pause(): void {}
}
