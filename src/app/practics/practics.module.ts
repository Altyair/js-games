import { ModuleWithProviders, NgModule, Provider } from "@angular/core";
import { CommonModule } from '@angular/common';

import { AsyncPipe } from './async-pipe/pipes/async.pipe';
import { ExampleComponent } from './async-pipe/components/example.component';
import { DumbComponent } from './async-pipe/components/dumb/dumb.component';
import { DirectiveComponent } from './async-pipe/components/directive/directive.component';
import { TestService } from "./async-pipe/test.service";
import { TestModule } from "./test/test.module";
import { DumbChildComponent } from './async-pipe/components/dumb-child/dumb-child.component';
import { TestDirective } from './directives/test.directive';
import { TITLE } from "./tokenTitles";
import { TitleService1 } from "./title.service1";
import { ColoryDirective } from "./directives/colory.directive";

@NgModule({
    declarations: [
        AsyncPipe,
        ExampleComponent,
        DumbComponent,
        DirectiveComponent,
        DumbChildComponent,
        TestDirective,
        ColoryDirective,
    ],
    imports: [
        CommonModule,
        TestModule
    ],
    // providers: [
    //     { provide: TestService, useValue: { title: 'from practice module' } },
    //     { provide: TITLE, useValue: { title: 'practice module' }, multi: true },
    // ],
})
export class PracticeModule {
    static forRoot(titles: TestService[] = []): ModuleWithProviders<PracticeModule> {
        return {
            ngModule: PracticeModule,
            providers: [
                { provide: TestService, useValue: { title: 'from practice module' } },
                // { provide: TITLE, useValue: { title: 'practice module' }, multi: true },
                TitleService1,
                ...titles.map<Provider>((title) => ({
                    provide: TITLE,
                    multi: true,
                    useValue: title,
                }))
            ],
        };
    }
}
