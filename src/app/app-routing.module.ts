import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
    },
    {
        path: 'tank',
        component: TestComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
