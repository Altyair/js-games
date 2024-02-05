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
import { CanvasComponent } from './canvas/canvas.component';

registerLocaleData(localeRu, 'ru-RU');

@NgModule({
    declarations: [AppComponent, TankComponent, CanvasComponent],
    exports: [TankComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, MatToolbarModule, CoreModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
