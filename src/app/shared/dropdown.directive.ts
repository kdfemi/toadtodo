import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  dropped = false;
  @HostBinding('class.open') get dropdown() {

    return this.dropped;
   }

  @HostListener('click')
  onclick() {

    this.dropped = !this.dropped;
  }
  constructor(private el: ElementRef) { }

}
