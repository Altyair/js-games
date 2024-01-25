import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

/*
    Tank
*/
class Tank {
    ctx: any;
    x: number = 0;
    y: number = 0;
    xmov: number = 0;
    ymov: number = 0;
    arsenal: any[] = [];

    constructor(ctx: any, xmov: number, ymov: number, x: number, y: number) {
        this.ctx = ctx;
        this.xmov = xmov;
        this.ymov = ymov;
        this.x = x;
        this.y = y;
    }

    setArsenal(arsenal: any): void {
        this.arsenal = arsenal;
    }

    move(): void {
        this.x += this.xmov;
        this.y += this.ymov;
    }

    moveY(): void {
        this.y -= this.ymov;
    }

    create(): void {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, 10, 10);
        this.ctx.fillStyle = '#FF0000';
        this.ctx.fill();
        this.ctx.closePath();

        // Filled triangle
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + 5, this.y);
        this.ctx.lineTo(this.x + 5, this.y - 5);
        this.ctx.strokeStyle = '#FF0000'; //цвет линии
        this.ctx.lineWidth = '2'; //толщина линии
        this.ctx.stroke(); // обводка линии
    }
}

/*
    Bullet
 */
class Bullet {
    context: any;
    x: number = 0;
    y: number = 0;
    xmov: number = 0;
    ymov: number = 0;
    active: boolean = false;

    constructor(context: any, xmov: number, ymov: number) {
        this.context = context;
        this.xmov = xmov;
        this.ymov = ymov;
    }

    setXY(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    move(): void {
        this.x += this.xmov;
        this.y += this.ymov;
    }

    moveY(): void {
        this.y -= this.ymov;
    }

    moveX(): void {
        this.x += this.xmov;
    }

    create(): void {
        this.context.beginPath();
        this.context.rect(this.x, this.y, 2, 2);
        this.context.fillStyle = '#000000';
        this.context.fill();
        this.context.closePath();
    }
}

/*
    Game
*/
class Game {
    tank: any;
    bullet: any;

    context: any;
    canvas: any;
    interval$: Subscription | undefined;
    constructor(context: any, canvas: any) {
        this.context = context;
        this.canvas = canvas;
        this.tank = new Tank(
            this.context,
            1,
            1,
            this.canvas.nativeElement.width / 2,
            this.canvas.nativeElement.height - 50
        );
        this.tank.setArsenal([
            new Bullet(this.context, this.canvas.nativeElement.width / 2 + 4, this.canvas.nativeElement.height - 50),
        ]);

        this.initEvents();
    }

    initEvents(): void {
        document.onkeydown = (event: any) => {
            if (event.keyCode === 32) {
                this.bullet.active = true;
            }
            if (event.keyCode === 87) {
                this.tank.moveY();
            }
        };
    }

    render(): void {
        this.interval$ = interval(50).subscribe(() => {
            this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
            this.bullet.create();
            this.tank.create();

            if (this.bullet.active) {
                this.bullet.moveY();
            }
            // this.tank.move();
        });
    }

    stopRender(): void {
        this.interval$?.unsubscribe();
    }
}

@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>',
})
export class AppComponent {
    // @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement> | undefined;
    // public context: CanvasRenderingContext2D | null | undefined;
    //
    // game: any;
    //
    // ngAfterViewInit(): void {
    //     this.context = this.canvas!.nativeElement.getContext('2d');
    //
    //     this.game = new Game(this.context, this.canvas);
    //     // this.game.render();
    //
    //     // console.log(this.validateBrackets1('[{]'));
    //     // console.log(this.searchInsert([1, 2, 4, 7, 11, 15, 25], 11));
    //
    //     // console.log(this.canJump([1, 3, 0, 4, 1, 0, 3]));
    //     // console.log(this.canJump([1, 3, 0, 2, 1, 0, 3]));
    //
    //     // console.log(this.bubbleSort([1, 3, 0, 2, 1, 0, 3]));
    //     console.log(this.lengthOfLastWord('test7 qwerty moonlight'));
    // }
    //
    // // длина последней подстроки в строке
    // lengthOfLastWord(s: string): number {
    //     const str: string = s.trim();
    //     console.log(str);
    //     let counter = 0;
    //     for (let i = str.length - 1; i >= 0; i--) {
    //         if (str.charAt(i) !== ' ') {
    //             counter++;
    //         } else {
    //             break;
    //         }
    //     }
    //     return counter;
    // }
    //
    // // сортировка пузырьком
    // bubbleSort(array: number[]) {
    //     console.log(array);
    //     for (let i = 0; i < array.length; i++) {
    //         for (let j = 0; j < array.length - i - 1; j++) {
    //             if (array[j] > array[j + 1]) {
    //                 const element = array[j];
    //                 array[j] = array[j + 1];
    //                 array[j + 1] = element;
    //             }
    //         }
    //         console.log(array);
    //     }
    //     return array;
    // }
    //
    // validateBrackets(s: string): boolean {
    //     const stack = [];
    //     for (const c of s) {
    //         if (c === '(' || c === '{' || c === '[') {
    //             stack.push(c);
    //         } else {
    //             if (
    //                 !stack.length ||
    //                 (c === ')' && stack[stack.length - 1] !== '(') ||
    //                 (c === '}' && stack[stack.length - 1] !== '{') ||
    //                 (c === ']' && stack[stack.length - 1] !== '[')
    //             ) {
    //                 return false;
    //             }
    //             stack.pop();
    //         }
    //     }
    //     return !stack.length;
    // }
    //
    // private pairs: any = {
    //     '(': ')',
    //     '{': '}',
    //     '[': ']',
    // };
    //
    // // validation of the bracket structure
    // validateBrackets1(str: string): boolean {
    //     const closes = Object.values(this.pairs);
    //     const stack = [];
    //     for (const s of str) {
    //         if (this.pairs[s]) {
    //             stack.push(this.pairs[s]);
    //         } else if (closes.includes(s) && s !== stack.pop()) {
    //             return false;
    //         }
    //     }
    //     return !stack.length;
    // }
    //
    // // binary search. ex: [1, 2, 4, 7, 11, 15, 25]
    // searchInsert(nums: number[], target: number): number {
    //     let left = 0;
    //     let right = nums.length - 1;
    //
    //     while (left <= right) {
    //         const mid = Math.floor((right - left) / 2) + left;
    //         if (target > nums[mid]) {
    //             left = mid + 1;
    //         } else {
    //             right = mid - 1;
    //         }
    //     }
    //     return left;
    // }
    //
    // // [1,3,0,4,1,2]
    // // [1,2,1,0,4]
    // canJump(nums: number[]): boolean {
    //     console.log('nums', nums);
    //     let reachable = 0;
    //     for (let i = 0; i < nums.length; i++) {
    //         console.log('i', i);
    //
    //         if (i > reachable) {
    //             return false;
    //         }
    //         reachable = Math.max(reachable, i + nums[i]);
    //         console.log('reachable', reachable);
    //     }
    //     return true;
    // }
}
