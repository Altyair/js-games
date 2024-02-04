import { RouterModule, Routes } from '@angular/router';
import { TankComponent } from './tank/tank.component';
import { NgModule } from '@angular/core';
import { LayoutComponent } from '@core/layout/layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'tank',
                component: TankComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
