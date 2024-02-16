import Arc from './objects/Arc';
import Geometry from './Geometry';

// TODO
// 1. добавить условие если catY!== 0 и (вершина C лежит в области проскости ЛИБО
//  точка пересения шара с плоскостью лежит на отрезке плоскости) ???
// 2. если след точки шара < грани плоскости, то рассчитывать корректные вектора, чтоб шар четко подходил к грани
// 3. отрефакторить код. убрать дубли, вынести все в отдельные классы. добавить интерфейсы. SOLID принципы.
// 4. столкновение 2х шаров.

export default class CheckCollisions {
    static sides: any = [];
    static ccords: any = [];

    static checkBallWithPlane(ball: Arc, planes: any, anim: any, context: any) {
        CheckCollisions.ccords = [];
        CheckCollisions.sides = planes;
        for (let i = 0; i < planes.length; i++) {
            const side = planes[i];
            // длина линии от центра шара перепендикулярно к плоскости
            const catYData = CheckCollisions.getCatY(ball.xmov, ball.ymov, ball.x, ball.y, side, context, 'first',  anim);
            const { catY, theta, gamma, isIntersect } = catYData;

            // момент столкновения с плоскостью
            if (isIntersect && catY <= ball.radius) {
                // для вектора шара
                const velLen = Math.sqrt(Math.pow(ball.xmov, 2) + Math.pow(ball.ymov, 2));

                // потенциальные координаты шара
                const xc = ball.x - velLen * Math.cos(theta - 2 * gamma);
                const yc = ball.y - velLen * Math.sin(theta - 2 * gamma);

                // новые вектора
                const newMovX = ball.x - xc;
                const newMovY = ball.y - yc;

                ball.xmov = newMovX;
                ball.ymov = newMovY;
                // anim.stop();
            } else {
                // момент столкновения с гранями плоскости
                CheckCollisions.checkBallWithSideEdges(side, ball, theta, anim, context);
            }

            // если шар вышел за грань плоскости то считаем корректные векторные скорости
            const nextCatYData = CheckCollisions.getCatY(
                ball.xmov,
                ball.ymov,
                ball.x + ball.xmov,
                ball.y + ball.ymov,
                side,
                context,
                'last',
                anim
            );
            if (isIntersect && nextCatYData.catY < ball.radius) {
                const len = Math.abs(ball.radius / Math.sin(nextCatYData.gamma));
                const xc = nextCatYData.intersectionLinesCoords.x - len * Math.cos(nextCatYData.theta);
                const yc = nextCatYData.intersectionLinesCoords.y - len * Math.sin(nextCatYData.theta);
                ball.vectorByFrame = { xmov: xc - ball.x, ymov: yc - ball.y };
            }
        }
    }

    static getCatY(ballXmov: number, ballYmov: number, bollX: number, bollY: number, side: any, context: any, type: string, anim: any): any {
        // угол наклона вектора шара
        const ballM = Geometry.getAngleOfSLopeByVectors(ballYmov, ballXmov);

        // угол наклона плоскости
        const planeM = Geometry.getAngleOfSLopeByVectors(side.y1 - side.y, side.x1 - side.x);

        // точка отсечения по y для шара
        const ballB = bollY - ballM * bollX;

        // точка отсечения по y для плоскости
        const planeB = side.y1 - planeM * side.x1;
        // console.log(planeB);
        // координаты пересечения вектора шара с плоскостью
        const x = (ballB - planeB) / (planeM - ballM);
        const y = planeM * x + planeB;

        // угол вектора шара к горизонту
        const theta = Math.atan2(ballYmov, ballXmov);

        // угол вектора шара к плоскости
        const gamma = theta - side.angl;

        // длина от центра шара до точки пересечения
        const len = Math.sqrt(Math.pow(x - bollX, 2) + Math.pow(y - bollY, 2));
        const catY = Math.floor(Math.abs(Math.sin(gamma) * len));

        // найти точку пересечения точки C с плоскостью и проверить что точка лежит на отрезке плоскости.
        // угол наклона вектора радиуса шара
        const radM = Geometry.getAngleOfSLopePerpByOtherLine(planeM);

        // точка отсечения по y для шара
        const radB = bollY - radM * bollX;
        // координаты пересечения вектора шара с плоскостью
        const radX = (radB - planeB) / (planeM - radM);
        const radY = planeM * radX + planeB;

        const ramM1 = Math.round(Geometry.getAngleOfSLopeByVectors(radY - side.y, radX - side.x));
        const ramM2 = Math.round(Geometry.getAngleOfSLopeByVectors(radY - side.y1, radX - side.x1));

        const isRadPointOnSide = Math.abs(ramM1) === Math.abs(ramM2) && Geometry.isPointInArea(radX, radY, side);

        return {
            catY,
            theta,
            gamma,
            intersectionLinesCoords: { x, y },
            isIntersect: !!catY && isRadPointOnSide,
        };
    }

    static checkBallWithSideEdges(side: any, ball: any, theta: number, anim: any, context :any) {

        const ballBetweenEdgeLen1 = Math.sqrt(Math.pow(ball.x - side.x, 2) + Math.pow(ball.y - side.y, 2));
        const ballBetweenEdgeLen2 = Math.sqrt(Math.pow(ball.x - side.x1, 2) + Math.pow(ball.y - side.y1, 2));

        if (ballBetweenEdgeLen1 <= ball.radius) {
            if (JSON.stringify(CheckCollisions.ccords).indexOf(JSON.stringify([side.x, side.y])) !== -1) {
                return;
            }

            // угол наклона плоскости
            const planeM = Geometry.getAngleOfSLopeByVectors(ball.y - side.y, ball.x - side.x);
            const ballM = Geometry.getAngleOfSLopeByVectors(ball.ymov, ball.xmov);
            const planeM1 = Geometry.getAngleOfSLopePerpByOtherLine(planeM);

            // точка отсечения по y для шара
            const ballB = ball.y - ballM * ball.x;

            // точка отсечения по y для плоскости
            const planeB = side.y - planeM1 * side.x;
            // console.log(planeB);
            // координаты пересечения вектора шара с плоскостью
            const x = (ballB - planeB) / (planeM1 - ballM);
            const y = planeM1 * x + planeB;

            // угол наклона плоскости
            const angl = Math.atan2(y - side.y, x - side.x);

            // для вектора шара
            const velLen = Math.sqrt(Math.pow(ball.xmov, 2) + Math.pow(ball.ymov, 2));

            // потенциальные координаты шара
            const xc = ball.x - velLen * Math.cos(theta - 2 * (theta - angl));
            const yc = ball.y - velLen * Math.sin(theta - 2 * (theta - angl));

            // новые вектора
            const newMovX = ball.x - xc;
            const newMovY = ball.y - yc;

            ball.xmov = newMovX;
            ball.ymov = newMovY;

            CheckCollisions.ccords.push([side.x, side.y]);
        } else if (ballBetweenEdgeLen2 <= ball.radius) {
            if (JSON.stringify(CheckCollisions.ccords).indexOf(JSON.stringify([side.x1, side.y1])) !== -1) {
                return;
            }

            // угол наклона плоскости
            const planeM = Geometry.getAngleOfSLopeByVectors(ball.y - side.y1, ball.x - side.x1);
            const ballM = Geometry.getAngleOfSLopeByVectors(ball.ymov, ball.xmov);
            const planeM1 = Geometry.getAngleOfSLopePerpByOtherLine(planeM);

            // точка отсечения по y для шара
            const ballB = ball.y - ballM * ball.x;

            // точка отсечения по y для плоскости
            const planeB = side.y1 - planeM1 * side.x1;
            // console.log(planeB);
            // координаты пересечения вектора шара с плоскостью
            const x = (ballB - planeB) / (planeM1 - ballM);
            const y = planeM1 * x + planeB;

            // угол наклона плоскости
            const angl = Math.atan2(y - side.y1, x - side.x1);

            // для вектора шара
            const velLen = Math.sqrt(Math.pow(ball.xmov, 2) + Math.pow(ball.ymov, 2));

            // потенциальные координаты шара
            const xc = ball.x - velLen * Math.cos(theta - 2 * (theta - angl));
            const yc = ball.y - velLen * Math.sin(theta - 2 * (theta - angl));

            // новые вектора
            const newMovX = ball.x - xc;
            const newMovY = ball.y - yc;

            ball.xmov = newMovX;
            ball.ymov = newMovY;

            CheckCollisions.ccords.push([side.x1, side.y1]);
        }
    }
}
