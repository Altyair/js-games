import { Inject, Injectable, Optional } from "@angular/core";
import { TITLE } from "./tokenTitles";
import { TestService } from "./async-pipe/test.service";

@Injectable()
export class TitleService1 {

  constructor(@Inject(TITLE) @Optional() public readonly titles: TestService[]) { }
}
