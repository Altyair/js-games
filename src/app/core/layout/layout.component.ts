import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuComponent } from '@core/layout/menu/menu.component';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    providers: [],
})
export class LayoutComponent implements OnInit, OnDestroy {
    @ViewChild(MenuComponent) menuComponent!: MenuComponent;
    private destroy$: Subject<void> = new Subject();

    constructor() {}

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
