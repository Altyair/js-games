import Arc from './objects/Arc';

export default class CheckCollisions {
    static checkBallWithPlane(ball: Arc, plane: any, anim: any) {
        plane.sides.forEach((side: any) => {
            // длина линии от центра шара перепендикулярно к плоскости
            const catYData = CheckCollisions.getCatY(ball.xmov, ball.ymov, ball.x, ball.y, side);
            const { catY, theta, gamma } = catYData;

            // момент столкновения с плоскостью
            if (catY <= ball.radius) {
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
            }

            // если шар вышел за грань плоскости то считаем корректные векторные скорости
            const nextCatYData = CheckCollisions.getCatY(
                ball.xmov,
                ball.ymov,
                ball.x + ball.xmov,
                ball.y + ball.ymov,
                side
            );
            if (nextCatYData.catY < ball.radius) {
                const len = Math.abs(ball.radius / Math.sin(nextCatYData.gamma));
                const xc = nextCatYData.intersectionLinesCoords.x - len * Math.cos(nextCatYData.theta);
                const yc = nextCatYData.intersectionLinesCoords.y - len * Math.sin(nextCatYData.theta);
                ball.vectorByFrame = { xmov: xc - ball.x, ymov: yc - ball.y };
            }
        });
    }

    static getCatY(ballXmov: number, ballYmov: number, bollX: number, bollY: number, side: any): any {
        // угол наклона вектора шара
        let ballM = ballYmov / ballXmov;
        if (ballM === Number.POSITIVE_INFINITY) {
            ballM = 1000000;
        } else if (ballM === Number.NEGATIVE_INFINITY) {
            ballM = -1000000;
        }

        // угол наклона плоскости
        let planeM = (side.y1 - side.y) / (side.x1 - side.x);
        if (planeM === Number.POSITIVE_INFINITY) {
            planeM = 1000000;
        } else if (planeM === Number.NEGATIVE_INFINITY) {
            planeM = -1000000;
        }

        // точка отсечения по y для шара
        const ballB = bollY - ballM * bollX;

        // точка отсечения по y для плоскости
        const planeB = side.y1 - planeM * side.x1;

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

        return {
            catY,
            theta,
            gamma,
            intersectionLinesCoords: { x, y },
        };
    }
}
