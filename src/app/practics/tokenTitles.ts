import {InjectionToken} from "@angular/core";
import {TestService } from "./async-pipe/test.service";

export const TITLE = new InjectionToken<TestService[]>('title');
