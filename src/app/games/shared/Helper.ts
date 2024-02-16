export class Helper {
    static randomValue(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    // проверка равенства двух массивов
    static isSame(array1: any, array2: any): boolean {
        return (
            array1.length === array2.length &&
            array1.every(function (element: any, index: number) {
                return element === array2[index];
            })
        );
    }

    static roundUp(num: number, precision: number): number {
        precision = Math.pow(10, precision);
        return Math.ceil(num * precision) / precision;
    }
}
