import { ChangeDetectionStrategy, Component, DoCheck, OnChanges } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { clear, countSelector, decrease, increase, updatedAtSelector } from '../../../reducers/counter';
import { TestService } from "../test.service";
import { TitleService } from "../../title.service";

interface User {
    name: string;
    surname: string;
}

@Component({
    selector: 'example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
    count$: Observable<number> | undefined;
    updatedAt$: Observable<number | undefined>;
    cannotDecrease$: Observable<boolean> | undefined;

    count: number = 0;

    constructor(private store: Store, public testService: TestService, public titleService: TitleService) {
        this.count$ = this.store.select(countSelector);
        this.cannotDecrease$ = this.count$.pipe(map((count) => count <= 0));
        this.updatedAt$ = this.store.select(updatedAtSelector);
    }

    increase(): void {
        this.store.dispatch(increase());
    }

    decrease(): void {
        this.store.dispatch(decrease());
    }

    clear(): void {
        this.store.dispatch(clear());
    }
}
