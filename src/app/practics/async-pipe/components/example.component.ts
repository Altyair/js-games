import { ChangeDetectionStrategy, Component } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

interface User {
    name: string;
    surname: string;
}

@Component({
    selector: 'example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
    user$?: Observable<User> = of({ name: 'Test1', surname: 'Testovich1' });
    value: Promise<Awaited<number>> = Promise.resolve(12);
    value$: Observable<number> = of(15);

    name$: Observable<string> = of('Test').pipe(delay(1500));

    onUpdateUser($event: User) {
        this.user$ = of({ name: 'Test3', surname: 'Testovich3' });
    }
}
