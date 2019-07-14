import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarToggleService {

  toggleChanaged = new Subject<boolean>();
  constructor() { }
}
