export default class Geometry {
    static isPointOnLine(
        point: { x: number; y: number },
        line: { x: number; y: number; x1: number; y1: number }
    ): boolean {
        return (
            Math.abs(
                Math.round(Geometry.getAngleOfSLopeByCoords({ y1: point.y, y: line.y, x1: point.x, x: line.x }))
            ) ===
            Math.abs(Math.round(Geometry.getAngleOfSLopeByCoords({ y1: point.y, y: line.y1, x1: point.x, x: line.x1 })))
        );
    }

    static isPointInLineSegment(
        point: { x: number; y: number },
        line: { x: number; y: number; x1: number; y1: number }
    ): boolean {
        return Geometry.isPointOnLine(point, line) && Geometry.isPointInArea(point, line);
    }

    static isPointInArea(
        point: { x: number; y: number },
        line: { x: number; y: number; x1: number; y1: number }
    ): boolean {
        return (
            point.x >= Math.min(line.x, line.x1) &&
            point.x <= Math.max(line.x1, line.x) &&
            point.y >= Math.min(line.y, line.y1) &&
            point.y <= Math.max(line.y1, line.y)
        );
    }

    static getAngleOfSLopeByCoords(coords: { x: number; y: number; x1: number; y1: number }): number {
        return Geometry._getAngleOfSLope((coords.y1 - coords.y) / (coords.x1 - coords.x));
    }

    static getAngleOfSLopeByVectors(ymov: number, xmov: number): number {
        return Geometry._getAngleOfSLope(ymov / xmov);
    }

    static getAngleOfSLopePerpByOtherLine(otherLineM: number): number {
        return Geometry._getAngleOfSLope(-1 / otherLineM);
    }

    static _getAngleOfSLope(M: number): number {
        if (M === Number.POSITIVE_INFINITY) {
            M = 1000000;
        } else if (M === Number.NEGATIVE_INFINITY) {
            M = -1000000;
        }
        return M;
    }

    static getAngleOfSLope(line: any): number {
        return line.otherSlope
            ? Geometry.getAngleOfSLopePerpByOtherLine(line.otherSlope)
            : line.ymov && line.xmov
            ? Geometry.getAngleOfSLopeByVectors(line.ymov, line.xmov)
            : Geometry.getAngleOfSLopeByCoords({
                  y1: line.coords.y1,
                  y: line.coords.y,
                  x1: line.coords.x1,
                  x: line.coords.x,
              });
    }

    static getLen(options: any): number {
        return options.hasOwnProperty('velX') && options.hasOwnProperty('velY')
            ? Math.sqrt(Math.pow(options.velX, 2) + Math.pow(options.velY, 2))
            : Math.sqrt(Math.pow(options.x - options.x1, 2) + Math.pow(options.y - options.y1, 2));
    }

    static getProjectionsXY(options: any): { xc: number; yc: number; newMovX: number; newMovY: number } {
        const velLen = Geometry.getLen({ velX: options.xmov, velY: options.ymov });

        console.log(options);
        console.log(velLen);

        const xc = options.x - velLen * Math.cos(options.angl);
        const yc = options.y - velLen * Math.sin(options.angl);

        return { xc, yc, newMovX: options.x - xc, newMovY: options.y - yc };
    }

    static findCoordinatesOfIntersectionByTwoLines(params: any): {
        x: number;
        y: number;
        line1M: number;
        line2M: number;
        line1B: number;
        line2B: number;
    } {
        const { line1, line2 } = params;

        const line1M = Geometry.getAngleOfSLope(line1);
        const line2M = Geometry.getAngleOfSLope(line2);

        const line1B = line1.trimCoords.y - line1M * line1.trimCoords.x;
        const line2B = line2.trimCoords.y - line2M * line2.trimCoords.x;

        // координаты пересечения
        const x = (line1B - line2B) / (line2M - line1M);
        const y = line2M * x + line2B;

        return { x, y, line1M, line2M, line1B, line2B };
    }
}
