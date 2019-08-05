import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sigup',
  templateUrl: './sigup.component.html',
  styleUrls: ['./sigup.component.css']
})
export class SigupComponent implements OnInit, AfterViewInit {

  constructor(private authService: AuthService, private router: Router) {}
  state: firebase.User;
  errorMessage: string;
  @ViewChild('passwordField', {static: false}) passworField: ElementRef;
  ngOnInit() {

  }

  ngAfterViewInit() {
    this.passworField.nativeElement.addEventListener('focus', (e) => {
      e.target.removeAttribute('readonly');
    });
  }

  submit(signupform: NgForm) {

    if (signupform.value.agreed) {
      const email = signupform.value.email;
      const password = signupform.value.password;
      const username = signupform.value.username;
      this.authService.signup(email, password, username)
      .then(
        () => this.router.navigate(['/', 'todo']))
      .catch(
        (err) => {
          this.errorMessage = err.message;
          console.log(err.message);

        });
    }
  }

}
