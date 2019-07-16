import { Directive, Input, HostBinding, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appTaskValidation]'
})
export class TaskValidationDirective {

@Input('appTaskValidation')el: FormControl;

  constructor() {
  }

@HostBinding('class.has-error') get inValid() {
  return (this.el.invalid && this.el.touched);
}

@HostBinding('class.has-success') get valid() {
  return (this.el.touched && this.el.valid);
}


}
