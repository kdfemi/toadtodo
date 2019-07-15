import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { createUrlResolverWithoutPackagePrefix, Element } from '@angular/compiler';
import { SidebarToggleService } from '../services/sidebar-toggle.service';

@Directive({
  selector: '[appSidebarToggle]'
})
export class SidebarToggleDirective {

  @Input('appSidebarToggle') el1;
  constructor(private el: ElementRef, private sidebarToggleService: SidebarToggleService) {
   }

  @HostListener('click')  onClick() {

    if (this.el1) {
      this.el1.classList.toggle('in');

    } else {
      this.el.nativeElement.classList.toggle('in');

    }

  }
  @HostListener('blur') onblur() {
    if ( this.el1.classList.contains('in') ) {
      setTimeout( () => this.el1.classList.remove('in'), 100);

      // this.el1.classList.remove('in');

    }
  }

}
