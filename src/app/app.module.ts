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

registerLocaleData(localeRu, 'ru-RU');

@NgModule({
    declarations: [AppComponent, TankComponent, CanvasComponent, Canvas1Component, Canvas2Component, Canvas3Component],
    exports: [TankComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, MatToolbarModule, CoreModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
