import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsyncPipe } from './async-pipe/pipes/async.pipe';
import { ExampleComponent } from './async-pipe/components/example.component';
import { DumbComponent } from './async-pipe/components/dumb/dumb.component';

@NgModule({
    declarations: [AsyncPipe, ExampleComponent, DumbComponent],
    providers: [],
    imports: [CommonModule],
})
export class PracticeModule {}
