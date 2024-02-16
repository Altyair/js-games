export default class Geometry {
    static isPointOnLine(radX: number, radY: number, side: any): boolean {
        return true;
        // (x - x_1) / (x_2 - x1) = (y - y_1) / (y_2 - y_1)
    }

    static isPointInArea(xC: number, yC: number, side: any): boolean {
        return (
            xC >= Math.min(side.x, side.x1) - 1 &&
            xC <= Math.max(side.x1, side.x) + 1 &&
            yC >= Math.min(side.y, side.y1) - 1 &&
            yC <= Math.max(side.y1, side.y) + 1
        );
    }

    static getAngleOfSLope(coord: { x: number; y: number; x1: number; y1: number }): number {
        let M = (coord.y1 - coord.y) / (coord.x1 - coord.x);
        // console.log(M);
        if (M === Number.POSITIVE_INFINITY) {
            M = 1000000;
        } else if (M === Number.NEGATIVE_INFINITY) {
            M = -1000000;
        }
        return M;
    }

    static getAngleOfSLopeByVectors(ymov: number, xmov: number): number {
        let M = ymov / xmov;
        if (M === Number.POSITIVE_INFINITY) {
            M = 1000000;
        } else if (M === Number.NEGATIVE_INFINITY) {
            M = -1000000;
        }
        return M;
    }

    static getAngleOfSLopePerpByOtherLine(otherLineM: number): number {
        let M = -1 / otherLineM;
        if (M === Number.POSITIVE_INFINITY) {
            M = 1000000;
        } else if (M === Number.NEGATIVE_INFINITY) {
            M = -1000000;
        }
        return M;
    }
}
