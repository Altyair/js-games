import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    DoCheck,
    Output,
    SimpleChanges,
    ChangeDetectorRef,
    OnInit,
    ContentChild,
    AfterContentInit,
    QueryList,
    ContentChildren,
    TemplateRef,
    ElementRef,
    ViewChild,
    AfterViewInit, Inject
} from "@angular/core";
import { DirectiveComponent } from '../directive/directive.component';
import { TestService } from '../../test.service';
import { TITLE } from "../../../tokenTitles";
import { TitleService } from "../../../title.service";
import { Test1Service } from "../../../test1.service";
import { TitleService1 } from "../../../title.service1";

interface User {
    name: string;
    surname: string;
}

@Component({
    selector: 'dumb',
    templateUrl: './dumb.component.html',
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: TestService, useValue: { title: 'from dumb component' } },
        { provide: TITLE, useValue: { title: 'dumb component' }, multi: true },
    ],
    viewProviders: [
        { provide: Test1Service, useValue: { title: '999' } }
    ]
    // viewProviders: [
    //     { provide: TestService, useValue: { title: 'from dumb component' } }
    // ]
})
export class DumbComponent implements OnChanges, DoCheck, OnInit, AfterContentInit, AfterViewInit {
    private _array: number[] = [];

    @Input() set array(val: number[]) {
        this._array = val;
    }
    get array() {
        return this._array;
    }
    @Input() user?: User | null;
    @Output() update = new EventEmitter<User>();

    title: string = '';

    private length = 1;

    @ContentChild('ref', { static: true, read: DirectiveComponent }) sfsDirective!: DirectiveComponent | undefined;
    @ContentChildren('ref', { read: DirectiveComponent }) childrenContent!: QueryList<DirectiveComponent>;

    @ContentChildren('foo, bar, baz', { read: TemplateRef })
    templates!: QueryList<TemplateRef<{ $implicit: string }>>;

    @ViewChild('test', { static: true, read: ElementRef }) test!: ElementRef<HTMLDivElement>;
    @ViewChild(DirectiveComponent) sfsDir!: DirectiveComponent;

    constructor(
        @Inject(TITLE) public titles: TestService[],
        private _cdr: ChangeDetectorRef,
        public testService: TestService,
        public titleService: TitleService,
        public titleService1: TitleService1,
    ) {}

    ngOnInit(): void {
        setTimeout(() => {
            this.title = 'Test';
            // this._cdr.markForCheck();
        }, 1000);
    }

    updateArray() {
        this.update.emit();
    }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log('onChanges child', changes);
    }

    ngDoCheck(): void {
        // console.log('doCheck child', this.array);

        if (this.length !== this.array?.length) {
            // console.log('Has changes');
            this.length = this.array?.length;
            this._cdr.markForCheck();
        }
    }

    ngAfterContentInit(): void {
        // console.log('template', this.templates);

        // this.sfsDirective?.sayHi();
        // if (this.sfsDirective) {
        //     this.sfsDirective.title = 'FOO';
        // }
    }

    ngAfterViewInit(): void {
        // this.sfsDir.title = '7777';
        // this._cdr.detectChanges();
    }
}
