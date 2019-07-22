import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-sigup',
  templateUrl: './sigup.component.html',
  styleUrls: ['./sigup.component.css']
})
export class SigupComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private aut: AngularFireAuth) {}
  state: firebase.User;
  ngOnInit() {

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
        (err) => console.log(err));
    }
  }

}
