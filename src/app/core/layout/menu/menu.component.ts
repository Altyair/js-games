import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface MenuItem {
    name: string;
    url: string[];
}

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss', '../../../../scss/menu.scss'],
})
export class MenuComponent implements OnInit {
    menuItems: MenuItem[] = [];

    constructor(readonly router: Router) {}

    ngOnInit(): void {
        this.menuItems = [
            {
                name: 'Simple game by rxjs',
                url: ['/tank'],
            },
            {
                name: 'Geometric shapes',
                url: ['/animation-1'],
            },
            {
                name: 'Gravitation',
                url: ['/animation-2'],
            },
            {
                name: 'Bezier',
                url: ['/animation-3'],
            },
            {
                name: 'Sparks',
                url: ['/animation-4'],
            },
            {
                name: 'Text from particles',
                url: ['/animation-5'],
            },
        ];
    }
}
