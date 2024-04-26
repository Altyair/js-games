import { ChangeDetectorRef, Injectable, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Pipe({
    name: 'asyncPipe',
    pure: false,
})
@Injectable()
export class AsyncPipe implements PipeTransform, OnDestroy {
    private observable?: Observable<any>;
    private value?: any;
    private subscription?: Subscription;

    constructor(private _cdr: ChangeDetectorRef) {}

    transform<T>(observable?: Observable<T>): T | null {
        if (!observable) {
            this.dispose();
            return null;
        }
        if (!this.observable) {
            this.observable = observable;
            this.observable.subscribe((val) => {
                this.value = val;
                this._cdr.detectChanges();
            });
        }

        if (this.observable !== observable) {
            this.dispose();
            return this.transform(observable);
        }

        return this.value ?? null;
    }

    private dispose() {
        this.subscription?.unsubscribe();
        this.subscription = undefined;
        this.observable = undefined;
        this.value = undefined;
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
