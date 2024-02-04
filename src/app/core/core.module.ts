import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LayoutComponent } from './layout/layout.component';
import { MenuComponent } from './layout/menu/menu.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { NgForOf } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
    exports: [LayoutComponent, MenuComponent],
    declarations: [LayoutComponent, MenuComponent],
    imports: [MatIconModule, MatDialogModule, RouterLink, NgForOf, RouterLinkActive, MatToolbarModule, RouterOutlet],
    providers: [],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {}
}
