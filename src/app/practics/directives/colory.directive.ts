import { Directive, HostBinding } from "@angular/core";

@Directive({
  selector: '[sfsColory]',
  exportAs: 'colory',
})
export class ColoryDirective {
  @HostBinding('style.color') color = 'red';
  constructor() { }

  public setColor(color: string) {
    this.color = color;
  }
}
