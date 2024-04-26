import { RouterModule, Routes } from '@angular/router';
import { TankComponent } from './tank/tank.component';
import { NgModule } from '@angular/core';
import { LayoutComponent } from '@core/layout/layout.component';
import { CanvasComponent } from './animations/canvas/canvas.component'
import { Canvas1Component } from './animations/canvas-1/canvas-1.component';
import { Canvas2Component } from './animations/canvas-2/canvas-2.component';
import { Canvas3Component } from './animations/canvas-3/canvas-3.component';
import { Canvas4Component } from './animations/canvas-4/canvas-4.component';
import { Canvas5Component } from './animations/canvas-5/canvas-5.component';
import { ExampleComponent } from './practics/async-pipe/components/example.component';

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
            {
                path: 'animation-4',
                component: Canvas3Component,
            },
            {
                path: 'animation-5',
                component: Canvas4Component,
            },
            {
                path: 'animation-6',
                component: Canvas5Component,
            },
            {
                path: 'example',
                component: ExampleComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
