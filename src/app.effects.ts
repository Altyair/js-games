import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { changeUpdatedAt, clear, decrease, increase } from './app/reducers/counter';
import { map } from 'rxjs';

@Injectable()
export class AppEffects {
    updatedAt$: any;

    constructor(private actions$: Actions) {
        console.log(this.actions$);
        this.updatedAt$ = createEffect(() =>
            this.actions$!.pipe(
                ofType(increase, decrease, clear),
                map(() => changeUpdatedAt({ updatedAt: Date.now() }))
            )
        );
    }
}
