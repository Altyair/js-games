import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TankComponent } from './tank/tank.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
    },
    {
        path: 'tank',
        component: TankComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
