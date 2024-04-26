import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

interface User {
    name: string;
    surname: string;
}

@Component({
    selector: 'dumb',
    templateUrl: './dumb.component.html',
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DumbComponent {
    @Input() user?: User | null;
    @Output() update = new EventEmitter<User>();

    updateUser() {
        this.update.emit();
    }
}
