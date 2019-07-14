import { Directive, HostListener, Input, ElementRef } from '@angular/core';
import { SidebarToggleService } from '../services/sidebar-toggle.service';

@Directive({
  selector: '[appSidebarTodoToggle]'
})
export class SidebarTodoToggleDirective {

  @Input('appSidebarTodoToggle') el1;
  isHidden = true;
  constructor(private el: ElementRef, private sidebarToggleService: SidebarToggleService, private toogleService: SidebarToggleService) {
   }

  @HostListener('click')  onClick() {

    if (this.el1) {

      this.isHidden = !this.isHidden;
      this.el1.classList.toggle('hidden-xs');
      this.el1.classList.toggle('col-xs-6');
      this.el1.classList.toggle('col-xs-12');
      this.el1.focus();
      this.toogleService.toggleChanaged.next(this.isHidden);
    }

  }
  @HostListener('blur') onblur() {
 if (!(this.el1.classList.contains('hidden-xs'))) {
      setTimeout( () => {
        this.isHidden = !this.isHidden;
        this.el1.classList.toggle('hidden-xs');
        this.el1.classList.toggle('col-xs-6');
        this.el1.classList.toggle('col-xs-12');
        this.toogleService.toggleChanaged.next(this.isHidden);
        }, 100);
    }


  }


}
