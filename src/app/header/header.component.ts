import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChange, SimpleChanges, AfterViewInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {


  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private location: Location) { }


  @ViewChild('logginAction', {static: false}) loggingAction: ElementRef;

  // isToggled = false;


  ngOnInit() {}

  ngAfterViewInit(): void {
    if (this.location.path() === '/signup') {
      this.loggingAction.nativeElement.innerText = 'signin';
    } else {
      this.loggingAction.nativeElement.innerText = 'signup';
    }
  }

  onSignIn() {
    if (this.location.path() === '/signup' ) {
      this.loggingAction.nativeElement.innerText = 'signup';
      this.router.navigate(['signin'], {relativeTo: this.route});
    } else {
      this.loggingAction.nativeElement.innerText = 'signin';
      this.router.navigate(['signup'], {relativeTo: this.route});
    }

  }

  logout() {
    this.authService.logout().then(
      () => {
        this.router.navigate(['/', 'signin']);
        this.ngAfterViewInit();
      }
    );

  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
