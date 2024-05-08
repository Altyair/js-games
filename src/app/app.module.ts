import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TankComponent } from './tank/tank.component';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoreModule } from '@core/core.module';
import { CanvasComponent } from './animations/canvas/canvas.component';
import { Canvas1Component } from './animations/canvas-1/canvas-1.component';
import { Canvas2Component } from './animations/canvas-2/canvas-2.component';
import { Canvas3Component } from './animations/canvas-3/canvas-3.component';
import { Canvas4Component } from './animations/canvas-4/canvas-4.component';
import { Canvas5Component } from './animations/canvas-5/canvas-5.component';
import { PracticeModule } from './practics/practics.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from '../app.effects';
import { metaReducers, reducers } from './reducers';
import { TITLE } from "./practics/tokenTitles";

registerLocaleData(localeRu, 'ru-RU');

@NgModule({
    declarations: [
        AppComponent,
        TankComponent,
        CanvasComponent,
        Canvas1Component,
        Canvas2Component,
        Canvas3Component,
        Canvas4Component,
        Canvas5Component,
    ],
    exports: [TankComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        CoreModule,
        PracticeModule.forRoot([
            { title: '1' },
            { title: '2' },
            { title: '3' }
        ]),
        StoreModule.forRoot(reducers, {
            metaReducers,
        }),
        StoreDevtoolsModule.instrument({ maxAge: 25 }),
        EffectsModule.forRoot([AppEffects]),
    ],
    bootstrap: [AppComponent],
    providers: [
        // { provide: TITLE, useValue: { title: 'app module' }, multi: true },
    ]
})
export class AppModule {}
