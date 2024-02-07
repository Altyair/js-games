import Arc from './objects/Arc';

export default class CheckCollisions {
    static checkBallWithPlane(ball: Arc, plane: any, anim: any) {
        plane.sides.forEach((side: any) => {
            // угол наклона вектора шара
            let ballM = ball.ymov / ball.xmov;
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
            const ballB = ball.y - ballM * ball.x;

            // точка отсечения по y для плоскости
            const planeB = side.y1 - planeM * side.x1;

            // координаты пересечения вектора шара с плоскостью
            const x = (ballB - planeB) / (planeM - ballM);
            const y = planeM * x + planeB;

            // угол вектора шара к горизонту
            const theta = Math.atan2(ball.ymov, ball.xmov);

            // угол вектора шара к плоскости
            const gamma = theta - side.angl;

            // длина от центра шара до точки пересечения
            const len = Math.sqrt(Math.pow(x - ball.x, 2) + Math.pow(y - ball.y, 2));

            // длина линии от центра шара перепендикулярно к плоскости
            const catY = Math.abs(Math.sin(gamma) * len);

            console.log('catY', catY);

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
                anim.stop();
            }
        });
    }
}
