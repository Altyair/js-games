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
                name: 'Игра-1',
                url: ['/tank'],
            },
            {
                name: 'Анимация-1',
                url: ['/animation-1'],
            },
        ];
    }
}
