import { RouterModule, Routes } from '@angular/router';
import { TankComponent } from './tank/tank.component';
import { NgModule } from '@angular/core';
import { LayoutComponent } from '@core/layout/layout.component';
import { CanvasComponent } from './animations/canvas/canvas.component'
import { Canvas1Component } from './animations/canvas-1/canvas-1.component';
import { Canvas2Component } from './animations/canvas-2/canvas-2.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'tank',
                component: TankComponent,
            },
            {
                path: 'animation-1',
                component: CanvasComponent,
            },
            {
                path: 'animation-2',
                component: Canvas1Component,
            },
            {
                path: 'animation-3',
                component: Canvas2Component,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
