import Arc from './objects/Arc';
import Geometry from './Geometry';
import {
    ISides
} from './interfaces';

// TODO
// 2. если след точки шара < грани плоскости, то рассчитывать корректные вектора, чтоб шар четко подходил к грани
// 3. отрефакторить код. убрать дубли, вынести все в отдельные классы. добавить интерфейсы. SOLID принципы. ++-
//         интерфейсы: убрать все any
// 4. столкновение 2х шаров.

export default class CheckCollisions {
    static checkArcWithPlane(arc: Arc, sides: ISides, anim: any, context: any) {
        const endsLineSegments: [x: number, y: number][] = [];
        for (let i = 0; i < sides.length; i++) {
            const side = sides[i];
            // длина линии от центра шара перепендикулярно к плоскости
            const catYData = CheckCollisions._getCatY(arc.xmov, arc.ymov, arc.x, arc.y, side);
            const { catY, theta, gamma, isIntersect } = catYData;

            // момент столкновения с плоскостью
            if (isIntersect && catY <= arc.radius) {
                const projectionsXY = Geometry.getProjectionsXY({
                    x: arc.x,
                    y: arc.y,
                    xmov: arc.xmov,
                    ymov: arc.ymov,
                    angl: theta - 2 * gamma,
                });
                arc.xmov = projectionsXY.newMovX;
                arc.ymov = projectionsXY.newMovY;
                // anim.stop();
            } else {
                // момент столкновения с концами отрезка
                CheckCollisions._checkBallWithSideEdges(endsLineSegments, side, arc, theta);
            }

            // если шар вышел за грань плоскости то считаем корректные векторные скорости
            const nextCatYData = CheckCollisions._getCatY(
                arc.xmov,
                arc.ymov,
                arc.x + arc.xmov,
                arc.y + arc.ymov,
                side
            );
            if (isIntersect && nextCatYData.catY < arc.radius) {
                const len = Math.abs(arc.radius / Math.sin(nextCatYData.gamma));
                const xc = nextCatYData.intersectionBallWithSideCoords.x - len * Math.cos(nextCatYData.theta);
                const yc = nextCatYData.intersectionBallWithSideCoords.y - len * Math.sin(nextCatYData.theta);
                arc.vectorByFrame = { xmov: xc - arc.x, ymov: yc - arc.y };
            }
        }
    }

    static _getCatY(arcXmov: number, arcYmov: number, arcX: number, arcY: number, side: any): any {
        // координаты пересечения вектора шара с плоскостью
        const intersectionBallWithSideCoords = Geometry.findCoordinatesOfIntersectionByTwoLines({
            line1: { xmov: arcXmov, ymov: arcYmov, trimCoords: { x: arcX, y: arcY } },
            line2: { coords: side, trimCoords: { y: side.y1, x: side.x1 } },
        });

        // угол вектора шара к горизонту
        const theta = Math.atan2(arcYmov, arcXmov);

        // угол вектора шара к плоскости
        const gamma = theta - side.angl;

        // длина от центра шара до точки пересечения
        const len = Geometry.getLen({
            x: intersectionBallWithSideCoords.x,
            x1: arcX,
            y: intersectionBallWithSideCoords.y,
            y1: arcY,
        });

        const catY = Math.floor(Math.abs(Math.sin(gamma) * len));

        // координаты пересечения радиуса перепендикулярного к плоскости
        const intersectionCatWithSideCoords = Geometry.findCoordinatesOfIntersectionByTwoLines({
            line1: { otherSlope: intersectionBallWithSideCoords.line2M, trimCoords: { x: arcX, y: arcY } },
            line2: { coords: side, trimCoords: { y: side.y1, x: side.x1 } },
        });

        return {
            catY,
            theta,
            gamma,
            intersectionBallWithSideCoords,
            isIntersect:
                !!catY &&
                Geometry.isPointInLineSegment(
                    { x: intersectionCatWithSideCoords.x, y: intersectionCatWithSideCoords.y },
                    { x: side.x, y: side.y, x1: side.x1, y1: side.y1 }
                ),
        };
    }

    static _checkBallWithSideEdges(endsLineSegments: any, side: any, arc: any, theta: number) {
        const ballBetweenEdgeLen1 = Geometry.getLen({ x: arc.x, x1: side.x, y: arc.y, y1: side.y });
        const ballBetweenEdgeLen2 = Geometry.getLen({ x: arc.x, x1: side.x1, y: arc.y, y1: side.y1 });

        const collisionHandler = (sideX: number, sideY: number) => {
            // координаты пересечения радиуса перепендикулярного к плоскости
            const intersectionBallWithPlaneCoords = Geometry.findCoordinatesOfIntersectionByTwoLines({
                line1: {
                    otherSlope: Geometry.getAngleOfSLopeByVectors(arc.y - sideY, arc.x - sideX),
                    trimCoords: { x: sideX, y: sideY },
                },
                line2: { ymov: arc.ymov, xmov: arc.xmov, trimCoords: { y: arc.y, x: arc.x } },
            });

            // угол наклона плоскости
            const angl = Math.atan2(
                intersectionBallWithPlaneCoords.y - sideY,
                intersectionBallWithPlaneCoords.x - sideX
            );

            const projectionsXY = Geometry.getProjectionsXY({
                x: arc.x,
                y: arc.y,
                xmov: arc.xmov,
                ymov: arc.ymov,
                angl: theta - 2 * (theta - angl),
            });
            arc.xmov = projectionsXY.newMovX;
            arc.ymov = projectionsXY.newMovY;

            endsLineSegments.push([sideX, sideY]);
        };

        if (ballBetweenEdgeLen1 <= arc.radius) {
            if (JSON.stringify(endsLineSegments).indexOf(JSON.stringify([side.x, side.y])) !== -1) {
                return;
            }
            collisionHandler(side.x, side.y);
        } else if (ballBetweenEdgeLen2 <= arc.radius) {
            if (JSON.stringify(endsLineSegments).indexOf(JSON.stringify([side.x1, side.y1])) !== -1) {
                return;
            }
            collisionHandler(side.x1, side.y1);
        }
    }
}
