import { Directive, HostBinding } from '@angular/core';
import { SidebarToggleService } from '../services/sidebar-toggle.service';

@Directive({
  selector: '[appMainbarTodoToggle]'
})
export class MainbarTodoToggleDirective {

 isOpen: boolean;
  constructor(private toggleService: SidebarToggleService) { }

  @HostBinding('class.hidden-xs') get
   valid() {
    this.toggleService.toggleChanaged.subscribe( isHidden => {
      this.isOpen = !isHidden;
    });
    return this.isOpen;
  }

}
