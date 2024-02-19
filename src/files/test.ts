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

// this.context!.moveTo(600, 300); // центр
// this.context!.lineTo(600 + xmov, 300 + ymov); // линия врпаво
//
// this.context!.moveTo(600, 300); // центр
// this.context!.lineTo(600 - xmov, 300 - ymov); // линия влево
//
// this.context!.moveTo(600, 300); // центр
// this.context!.lineTo(600 + xmov1, 300 + ymov1); // линия вниз
//
// this.context!.moveTo(600, 300); // центр
// this.context!.lineTo(600 - xmov1, 300 - ymov1); // линия вверх

// --------------------
// if (catY <= 20 && catY !== 0 && type === 'first' && isRadPointOnSide) {

// console.log(isRadPointOnSide);
// console.log('catY', catY);
// console.log('xC, yC', xC, yC);
// console.log(ramM1, ramM2);
// console.log('side', side);
// console.log('radXmov, radYmov', radXmov, radYmov);
// console.log((radX - side.x) / (side.x1 - side.x) === (radY - side.y) / (side.y1 - side.y));
// console.log(ballXmov * ballYmov);
// console.log(radX, radY);
// console.log(radM);
// console.log(planeM);

//
// context.beginPath();
// context.moveTo(bollX, bollY);
// context.lineTo(radX, radY);
// context!.strokeStyle = 'green';
// context!.stroke();

// context.beginPath();
// context.moveTo(bollX, bollY);
// context.lineTo(radX, radY);
// context!.strokeStyle = 'blue';
// context!.stroke();
//
// context.beginPath();
// context.moveTo(bollX, bollY);
// context.lineTo(x, y);
// context!.strokeStyle = 'red';
// context!.stroke();

// anim.stop();
// }

// // угол наклона вектора шара
// const ballM = Geometry.getAngleOfSLopeByVectors(ballYmov, ballXmov);
//
// // угол наклона плоскости
// const planeM = Geometry.getAngleOfSLopeByCoords({ y1: side.y1, y: side.y, x1: side.x1, x: side.x });
//
// // точка отсечения по y для шара
// const ballB = bollY - ballM * bollX;
//
// // точка отсечения по y для плоскости
// const planeB = side.y1 - planeM * side.x1;
//
// // координаты пересечения вектора шара с плоскостью
// const x = (ballB - planeB) / (planeM - ballM);
// const y = planeM * x + planeB;


// const radM = Geometry.getAngleOfSLopePerpByOtherLine(intersectionBallWithSideCoords.line2M);
//
// // точка отсечения по y для шара
// const radB = bollY - radM * bollX;
// // координаты пересечения вектора шара с плоскостью
// const radX = (radB - planeB) / (planeM - radM);
// const radY = planeM * radX + planeB;

// // для вектора шара
// const velLen = Geometry.getLen({ velX: ball.xmov, velY: ball.ymov });
//
// // потенциальные координаты шара
// const xc = ball.x - velLen * Math.cos(theta - 2 * gamma);
// const yc = ball.y - velLen * Math.sin(theta - 2 * gamma);


