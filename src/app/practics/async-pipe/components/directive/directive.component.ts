import { Component, DoCheck, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector: 'sfs-directive',
    templateUrl: './directive.component.html',
    styleUrls: ['./directive.component.scss'],
})
export class DirectiveComponent implements OnChanges, DoCheck {
    @Input() array: string[] = [];

    private _title: string = '';
    @Input() set title(val: string) {
      this._title = val;
    }
    get title(): string {
      return this._title;
    }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log('onChanges child', changes);
    }

    ngDoCheck(): void {
        // console.log('doCheck child1', this.array);
    }

    sayHi() {
        console.log('Hi from child');
    }
}
