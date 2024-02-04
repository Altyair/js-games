import { Component } from '@angular/core';
import { icons } from './icons';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    constructor(private readonly matIconRegistry: MatIconRegistry, private readonly domSanitzer: DomSanitizer) {
        this.initCustomMaterialIcons();
    }

    private initCustomMaterialIcons() {
        icons.forEach(({ path, name }) =>
            this.matIconRegistry.addSvgIcon(name, this.domSanitzer.bypassSecurityTrustResourceUrl(path))
        );
    }
}
